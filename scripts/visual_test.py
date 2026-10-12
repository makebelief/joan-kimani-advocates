"""Offline responsive QA using Playwright set_content; never fetches outside assets."""
from pathlib import Path
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import mimetypes,base64,json,re
ROOT=Path(__file__).resolve().parent.parent
paths=['','about','practice-areas','managing-partner','insights','contact','privacy','terms']
css=(ROOT/'assets/site.css').read_text();css=css.replace(css.split('\n')[0]+'\n','',1)
script=(ROOT/'assets/site.js').read_text()
def load(path):
 src=ROOT/path/'index.html' if path else ROOT/'index.html'
 s=BeautifulSoup(src.read_text(),'html.parser')
 for link in s.select('link[rel=stylesheet]'): link.replace_with(s.new_tag('style',string=css))
 for img in s.select('img[src^="/assets/"]'):
  p=ROOT/img['src'].lstrip('/')
  mime=mimetypes.guess_type(p)[0] or 'image/png'
  img['src']=f'data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}'
 for frame in s.select('iframe'):frame.decompose()
 return str(s)

results=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for view,w,h in [('desktop',1440,900),('tablet',820,1050),('mobile',390,844),('small-mobile',320,740)]:
  page=b.new_page(viewport={'width':w,'height':h}, device_scale_factor=1)
  for path in paths:
   page.set_content(load(path),wait_until='domcontentloaded',timeout=20000)
   page.add_script_tag(content=script)
   page.wait_for_timeout(70)
   doc=page.evaluate('''() => ({scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth,imageCount:document.images.length,broken:[...document.images].filter(img=>img.src.startsWith('data:')&&!img.naturalWidth).map(img=>img.alt)})''')
   assert page.locator('h1').count()==1, (view,path,'h1 missing')
   result=dict(view=view,path=path or '/',overflow=doc['scrollWidth']>w+1,doc=doc['scrollWidth'],broken=doc['broken'])
   results.append(result)
   if (path=='' and view in ('desktop','mobile','small-mobile')) or (path=='contact' and view=='mobile'):
    page.screenshot(path=f'/mnt/data/joan-{path or "home"}-{view}.png',full_page=True,animations='disabled',timeout=30000)
   if path=='' and view=='mobile':
    page.locator('[data-mobile-open]').click()
    assert page.locator('#mobile-panel').get_attribute('aria-hidden')=='false'
    page.locator('[data-mobile-close]').click()
    assert page.locator('#mobile-panel').get_attribute('aria-hidden')=='true'
  page.close()
 b.close()
print(json.dumps(results,indent=2))

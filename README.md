# Joan Kimani & Company Advocates — Production Website

A complete, responsive, static website for **Joan Kimani & Company Advocates**, based on the page structure, navigation and navy-and-gold visual direction of the supplied reference website:
https://co-were-company-advocates.vercel.app/

The code in this ZIP is a new self-contained implementation, not the original reference site's editable source. It can be published to GitHub and Vercel without a Node build, database or server-side API. **No new AI-generated imagery was used**: the portrait, logos and two advertising graphics are the client-provided assets. Practice-area photographs use external Pexels URLs, consistent with the supplied reference site's use of illustrative Pexels photos.

## Pages

- `/` — Home (intro, About, vision/mission/promise, featured practices, dispute resolution, firm approach, advocate, insights, contact prompts)
- `/about/` — About Us
- `/practice-areas/` — All 11 service categories
- `/managing-partner/` — Our Advocate
- `/insights/` — General informational articles
- `/contact/` — Call, WhatsApp, email, enquiry form and general Nairobi map
- `/privacy/` and `/terms/` — Privacy notice and website terms
- `/404.html` — Branded not-found page

## Details supplied by the client

**Firm name:** Joan Kimani & Company Advocates  
**Phone and WhatsApp:** `0716 337 451` (`+254716337451`)  
**Email:** `joankimani840@gmail.com`  
**Location (as printed in supplied flyer):** Nyasa Road, Opposite D.C.C Office, Next to Madaraka Law Courts, Jogoo Road, Nairobi, Kenya.

**Please confirm the exact street/address description before publishing**. The Google Maps button performs an address search, and the embedded OpenStreetMap view intentionally shows the *general* Nairobi area — not an asserted verified office pin.

The portrait is the user-supplied advocate image. No unverified admissions, degrees, partner biography, success statistics or client testimonials were invented.

## Deployment A — New GitHub repository + Vercel (recommended)

1. Unzip the archive and open a terminal in the unzipped folder:

```bash
unzip joan-kimani-advocates-production.zip
cd joan-kimani-advocates
```

2. Initialize Git and push to an empty GitHub repository you have created (replace `YOUR_GITHUB_USERNAME` and the repository name if needed):

```bash
git init
git branch -M main
git add .
git commit -m "Launch Joan Kimani Advocates website"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/joan-kimani-advocates.git
git push -u origin main
```

If you use the authenticated GitHub CLI and want it to create the repo for you, instead of `git remote add` + `git push`, run:

```bash
gh repo create joan-kimani-advocates --private --source=. --remote=origin --push
```

3. Link the local folder to your **own Joan Kimani website project** on Vercel, and publish it:

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

If you are already logged in, skip `npx vercel login`. When prompted, choose **Other** (no framework) and confirm the current folder as the deployment directory. No build command is required.

**Important:** Only select an existing Vercel project if you own it and intend to publish this new firm website there. Do not replace the reference firm's deployment by accident.

## Deployment B — GitHub repository already exists

Copy the website files into your existing repository's intended root folder, then:

```bash
git status
git add .
git commit -m "Update branding and website for Joan Kimani Advocates"
git push origin main
```

If your existing Vercel project is linked to `main`, the push automatically triggers a production deployment. To deploy explicitly from the terminal:

```bash
npx vercel link
npx vercel --prod
```

Do **not** run `git init` or add another remote inside an existing Git working tree. If your production branch is not `main`, use the actual branch name. If you are replacing an old website, make a backup or create a new branch first.

## Preview locally

From the website folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. The site is static and uses plain HTML, CSS and vanilla JavaScript.

## Editable source & maintenance

- `assets/site.css`: styles, desktop/tablet/mobile breakpoints.
- `assets/site.js`: mobile menu, keyboard handling, contact form mailto behavior.
- `scripts/build.py`: authoritative page copy, service data, email and phone constants; regenerate HTML with `python3 scripts/build.py`.
- `assets/joan-kimani-logo.png`: cropped transparent logo used in the header and footer.
- `assets/joan-kimani-original-transparent-4k.png`: client-provided 4K transparent logo.
- `assets/joan-kimani-original-white-4k.png`: client-provided 4K white-background logo.
- `assets/advocate-joan-kimani.webp`: client-supplied portrait, dimension-preserved and efficiently encoded to WebP.
- `assets/service-guide.webp` and `assets/services-poster.webp`: client-supplied service materials.
- `vercel.json`: Vercel routing and safety headers.

After changing names, phone, email, services or website copy in `scripts/build.py`, regenerate all pages with:

```bash
python3 scripts/build.py
```

Then commit and redeploy. You do not need to run this script on Vercel because the generated HTML is already included.

## Contact form behavior

The contact form validates the input and then opens the visitor's default email application with an enquiry addressed to `joankimani840@gmail.com`. **It does not send messages to a server or automatically deliver them.** The visitor must send the prepared email. This avoids pretending that the website has a backend or reliable email-delivery infrastructure when it does not.

Telephone links use `tel:+254716337451`. WhatsApp links use `https://wa.me/254716337451` with a prefilled draft message. No WhatsApp Business API, third-party CRM or account connection is required.

## Production checklist

- Confirm the address wording and whether you want an exact map pin added.
- Confirm that the firm consents to publication of its advocate portrait and branding materials.
- If you need form submissions without an email application, add a properly configured, consent-aware form service/backend before removing the explanatory mailto notice.
- If you attach a custom domain, update social preview/canonical URL metadata to use your final absolute domain.
- Check external Pexels photos and Google Fonts availability in the regions where the site will be viewed.
- Legal information on the Insights pages is introductory and should receive firm review before publication.

## Development QA

The file `scripts/visual_test.py` is an optional offline layout test which requires Python `playwright` and `beautifulsoup4` in your testing environment. The shipping site itself has **no Python, JavaScript framework or other application runtime dependency**.

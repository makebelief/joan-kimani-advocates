/* Joan Kimani & Company Advocates — dependency-free navigation and enquiry UI. */
(() => {
  'use strict';
  const body = document.body;
  const openButton = document.querySelector('[data-mobile-open]');
  const closeButton = document.querySelector('[data-mobile-close]');
  const panel = document.getElementById('mobile-panel');
  const backdrop = document.getElementById('mobile-backdrop');
  let lastFocus;
  function setMenu(open) {
    if (!panel) return;
    if (open) lastFocus = document.activeElement;
    panel.classList.toggle('open', open);
    backdrop?.classList.toggle('visible', open);
    body.classList.toggle('nav-open', open);
    openButton?.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    panel.toggleAttribute('inert', !open);
    if (open) closeButton?.focus();
    else (lastFocus || openButton)?.focus();
  }
  openButton?.addEventListener('click', () => setMenu(true));
  closeButton?.addEventListener('click', () => setMenu(false));
  backdrop?.addEventListener('click', () => setMenu(false));
  panel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel?.classList.contains('open')) setMenu(false);
    if (e.key !== 'Tab' || !panel?.classList.contains('open')) return;
    const nodes = [...panel.querySelectorAll('a,button')].filter(node => !node.disabled);
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const select = form.querySelector('#area');
  const chosen = new URLSearchParams(window.location.search).get('area');
  if (chosen && select && [...select.options].some(o => o.value === chosen)) select.value = chosen;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('company_website')) return;
    const clean = v => String(v || '').replace(/[\r\n]+/g, ' ').trim();
    const name = clean(data.get('name')).slice(0, 120);
    const reply = clean(data.get('email')).slice(0, 200);
    const phone = clean(data.get('phone')).slice(0, 30);
    const area = clean(data.get('area'));
    const message = String(data.get('message') || '').trim().slice(0, 3000);
    const subject = `Website legal enquiry — ${area}`;
    const mailBody = `Dear Joan Kimani & Company Advocates,\n\nI would like to make an enquiry.\n\nName: ${name}\nEmail: ${reply}\nPhone: ${phone || 'Not provided'}\nArea: ${area}\n\nMessage:\n${message}\n\nKind regards,\n${name}`;
    const href = `mailto:joankimani840@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    const status = document.getElementById('form-status');
    if (status) status.textContent = 'Your email application should open with the prepared enquiry. Review it and press Send there; nothing has been submitted to a website server.';
    window.location.href = href;
  });
})();

import { requests, normalizeService, createSummary } from './requests.mjs';
import { quoteEmail } from './config.mjs';

// Toute la lecture et la navigation restent disponibles sans JavaScript.
document.documentElement.classList.add('js-ready');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.textContent = 'Menu';
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Fermer' : 'Menu';
  navigation.classList.toggle('open', open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});

const picker = document.querySelector('.service-picker');
picker?.querySelectorAll('[data-pick]').forEach(control => {
  control.addEventListener('click', () => {
    const key = normalizeService(control.dataset.pick);
    const details = requests[key];
    picker.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === control)));
    document.querySelector('#require-title').textContent = details.title;
    document.querySelector('#require-list').replaceChildren(...details.requirements.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    document.querySelector('#prepare-link').href = `/demande-de-devis/?prestation=${key}`;
  });
});

const form = document.querySelector('#formulaire');
if (form) {
  const select = form.querySelector('[name=prestation]');
  const cache = new Map();
  let current = select.value;
  let summaryUrl;
  function updateFields(value) {
    const values = {};
    form.querySelectorAll('#details-prestation input').forEach(input => { values[input.name] = input.value; });
    cache.set(current, values);
    current = normalizeService(value);
    select.value = current;
    const saved = cache.get(current) || {};
    const details = requests[current];
    document.querySelector('#details-prestation').replaceChildren(...details.fields.map((text, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.name = input.id = `detail-${index}`;
      input.maxLength = 500;
      input.value = saved[input.name] || '';
      label.htmlFor = input.id;
      label.append(document.createTextNode(text), input);
      return label;
    }));
    form.querySelector('[name=message]').placeholder = details.placeholder;
  }
  updateFields(new URLSearchParams(location.search).get('prestation') || current);
  select.addEventListener('change', () => updateFields(select.value));
  const error = form.querySelector('.form-error');
  const email = form.querySelector('[name=email]');
  const phone = form.querySelector('[name=telephone]');
  function clearContactError() { email.setCustomValidity(''); error.hidden = true; }
  email.addEventListener('input', clearContactError);
  phone.addEventListener('input', clearContactError);
  const submit = form.querySelector('[type=submit]');
  // Sans le gestionnaire JS, le bouton reste désactivé pour éviter un GET accidentel.
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearContactError();
    if (!email.value.trim() && !phone.value.trim()) {
      const message = 'Indiquez un e-mail ou un numéro de téléphone pour le premier contact.';
      email.setCustomValidity(message);
      error.textContent = message;
      error.hidden = false;
      email.reportValidity();
      email.focus();
      return;
    }
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const summary = createSummary(values);
    document.querySelector('#summary').value = summary;
    if (summaryUrl) URL.revokeObjectURL(summaryUrl);
    summaryUrl = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const download = document.querySelector('#download-summary');
    download.href = summaryUrl;
    download.download = `ciam-pie-demande-${current}.txt`;
    const mailLink = document.querySelector('#email-summary');
    if (quoteEmail) {
      mailLink.hidden = false;
      mailLink.href = `mailto:${quoteEmail}?subject=${encodeURIComponent(`Demande de devis — ${requests[current].label}`)}&body=${encodeURIComponent(summary)}`;
      document.querySelector('#result-status').textContent = 'Votre récapitulatif est prêt. Rien n’a été envoyé : vous pouvez le télécharger ou ouvrir votre messagerie pour le transmettre.';
    }
    const result = document.querySelector('#recapitulatif');
    result.hidden = false;
    result.scrollIntoView({ block: 'start', behavior: 'instant' });
    const output = document.querySelector('#summary');
    output.focus({ preventScroll: true });
  });
  submit.disabled = false;
}

// Entrées ponctuelles ; aucun contenu caché au repos si le script échoue.
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const motions = new Set();
if ('IntersectionObserver' in window && Element.prototype.animate) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (calm.matches) continue;
      const animation = entry.target.animate(
        [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 700, delay: Number(entry.target.dataset.motionDelay) || 0, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
      motions.add(animation);
      animation.finished.then(() => motions.delete(animation)).catch(() => {});
    }
  }, { threshold: .12 });
  document.querySelectorAll('[data-enter]').forEach((element, index) => {
    element.dataset.motionDelay = String((index % 3) * 70);
    observer.observe(element);
  });
  calm.addEventListener('change', () => {
    if (calm.matches) { for (const animation of motions) animation.cancel(); motions.clear(); }
  });
}

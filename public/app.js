import { ROLES, NEEDS, createContact, recognizeVisitor } from './flow.js';

// Reading storage itself can throw in privacy-restricted browsers.
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const visitor = recognizeVisitor(storage);
let role = null;
let need = null;
const contactLink = document.querySelector('#whatsapp');

function showStep(name, number) {
  for (const section of document.querySelectorAll('.step')) section.hidden = section.id !== `step-${name}`;
  for (const item of document.querySelectorAll('[data-step]')) {
    const step = Number(item.dataset.step);
    item.classList.toggle('complete', step < number);
    if (step === number) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  }
  const heading = document.querySelector(`#step-${name} h3`);
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
}

function clearContact() {
  contactLink.removeAttribute('href');
  document.querySelector('#message').textContent = '';
  document.querySelector('#selection').textContent = '';
  document.querySelector('#product').textContent = '';
}

for (const button of document.querySelectorAll('[data-role]')) {
  button.addEventListener('click', () => {
    role = button.dataset.role;
    need = null;
    clearContact();
    showStep('need', 2);
  });
}
for (const button of document.querySelectorAll('[data-need]')) {
  button.addEventListener('click', () => {
    need = button.dataset.need;
    const contact = createContact({ role, need, ...visitor });
    contactLink.href = contact.url;
    document.querySelector('#selection').textContent = `${ROLES[role].label} · ${NEEDS[need].label}`;
    document.querySelector('#product').textContent = NEEDS[need].product;
    document.querySelector('#message').textContent = contact.text;
    showStep('contact', 3);
  });
}
for (const button of document.querySelectorAll('[data-back]')) {
  button.addEventListener('click', () => {
    need = null;
    clearContact();
    if (button.dataset.back === 'role') {
      role = null;
      showStep('role', 1);
    } else showStep('need', 2);
  });
}

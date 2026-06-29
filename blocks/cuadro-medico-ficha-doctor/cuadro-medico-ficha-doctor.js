// Tag labels que el JS conoce
const TAG_MAP = {
  'tag:professional': { text: 'MÉDICO / PROFESIONAL', cls: 'cmp-tag-template--blue' },
  'tag:asisa-center': { text: 'Centro de ASISA', cls: 'cmp-tag-template--blank' },
  'tag:eprescription': { text: 'Receta electrónica', cls: 'cmp-tag-template--blank' },
  'tag:online-appointment': { text: 'Cita online', cls: 'cmp-tag-template--blank' },
};

function buildTag(meta) {
  const div = document.createElement('div');
  div.className = `cmp-tag-template ${meta.cls}`;
  div.innerHTML = `<div class="cmp-tag-template__text">${meta.text}</div>`;
  return div;
}

function readPrefix(el, prefix) {
  const text = el?.textContent?.trim() || '';
  return text.startsWith(`${prefix}:`) ? text.slice(prefix.length + 1) : null;
}

export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  const els = [...inner.children];

  // Leer key del bloque
  const keyEl = els.find((el) => readPrefix(el, 'key'));
  const key = keyEl ? readPrefix(keyEl, 'key') : null;

  // --- Breadcrumb ---
  const ol = inner.querySelector('ol');
  const nav = document.createElement('nav');
  nav.className = 'cmp-breadcrumb';
  const newOl = document.createElement('ol');
  newOl.className = 'cmp-breadcrumb__list';
  [...ol.querySelectorAll('li')].forEach((li, i, arr) => {
    const a = li.querySelector('a');
    const newLi = document.createElement('li');
    const isLast = i === arr.length - 1;
    newLi.className = `cmp-breadcrumb__item${isLast ? ' cmp-breadcrumb__item--active' : ''}`;
    if (isLast) {
      const span = document.createElement('span');
      span.className = 'cmp-breadcrumb__item-link';
      if (a) span.setAttribute('data-href', a.getAttribute('href'));
      span.textContent = a ? a.textContent : li.textContent;
      newLi.appendChild(span);
    } else {
      if (a) {
        a.className = 'cmp-breadcrumb__item-link';
        newLi.appendChild(a);
      }
    }
    newOl.appendChild(newLi);
  });
  nav.appendChild(newOl);

  // --- h1 + intro ---
  const h1 = inner.querySelector('h1');
  const introEl = els.find((el) => el.tagName === 'P' && !el.textContent.includes(':'));

  const boxHead = document.createElement('section');
  boxHead.className = 'eds-mp-box-head';
  h1.className = 'eds-mp-box-head--title';
  boxHead.appendChild(h1);
  if (introEl) {
    introEl.className = 'eds-mp-box-head--text';
    boxHead.appendChild(introEl);
  }

  // --- Tags ---
  const tagEls = els.filter((el) => TAG_MAP[el.textContent?.trim()]);
  const tagsDiv = document.createElement('div');
  tagsDiv.className = 'cmp-medical-detail__title-block__tags';
  tagEls.forEach((el) => {
    tagsDiv.appendChild(buildTag(TAG_MAP[el.textContent.trim()]));
    el.remove();
  });

  // --- Spec, h2 (nombre), collegiate ---
  const specEl = els.find((el) => readPrefix(el, 'spec'));
  const spec = specEl ? readPrefix(specEl, 'spec') : '';
  const h2 = inner.querySelector('h2');
  const collegiateEl = els.find((el) => readPrefix(el, 'collegiate'));
  const collegiate = collegiateEl ? readPrefix(collegiateEl, 'collegiate') : '';

  const titleBlock = document.createElement('div');
  titleBlock.className = 'cmp-medical-detail__title-block';
  titleBlock.appendChild(tagsDiv);

  if (spec) {
    const specP = document.createElement('p');
    specP.className = 'cmp-medical-detail__title-block--speciality';
    specP.textContent = spec;
    titleBlock.appendChild(specP);
  }
  if (h2) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'cmp-title';
    h2.className = 'cmp-title__text';
    titleDiv.appendChild(h2);
    titleBlock.appendChild(titleDiv);
  }
  if (collegiate) {
    const colP = document.createElement('p');
    colP.className = 'cmp-medical-detail__title-block--num-member';
    colP.textContent = `Núm. Colegiado – ${collegiate}`;
    titleBlock.appendChild(colP);
  }

  // --- Address block ---
  // El centro es el primer <a class="button"> que apunta a /cuadro-medico/c/
  const centerA = inner.querySelector('a[href^="/cuadro-medico/c/"]');
  const addressEl = els.find((el) => readPrefix(el, 'address'));
  const address = addressEl ? readPrefix(addressEl, 'address') : '';
  const mapsA = inner.querySelector('a[href*="google.com/maps"]');

  const addressBlock = document.createElement('div');
  addressBlock.className = 'cmp-medical-detail__address-block';

  if (centerA) {
    const centerDiv = document.createElement('div');
    centerDiv.className = 'cmp-medical-detail__address-block--center';
    centerDiv.appendChild(centerA);
    addressBlock.appendChild(centerDiv);
  }
  if (address) {
    const addrDiv = document.createElement('div');
    addrDiv.className = 'cmp-medical-detail__address-block--name';
    addrDiv.innerHTML = `<i class="icon-marker-02"></i>${address}`;
    addressBlock.appendChild(addrDiv);
  }
  if (mapsA) {
    const locDiv = document.createElement('div');
    locDiv.className = 'cmp-medical-detail__address-block__location';
    mapsA.removeAttribute('class');
    locDiv.appendChild(mapsA);
    addressBlock.appendChild(locDiv);
  }

  // --- Buttons block ---
  const phoneA = inner.querySelector('a[href^="tel:"]');
  const buttonsBlock = document.createElement('div');
  buttonsBlock.className = 'cmp-medical-detail__buttons-block';

  if (phoneA) {
    const btnDiv = document.createElement('div');
    btnDiv.className = 'button-cmp';
    phoneA.className = 'button-cmp__text button-cmp__text--link';
    phoneA.innerHTML = `<i class="icon-phone"></i>${phoneA.textContent}`;
    btnDiv.appendChild(phoneA);
    buttonsBlock.appendChild(btnDiv);
  }

  // --- Montar first-block ---
  const firstBlock = document.createElement('div');
  firstBlock.className = 'cmp-medical-detail__first-block';
  firstBlock.appendChild(titleBlock);
  firstBlock.appendChild(addressBlock);
  firstBlock.appendChild(buttonsBlock);

  // --- Wrapper principal ---
  const detail = document.createElement('div');
  detail.className = 'cmp-medical-detail';
  if (key) detail.setAttribute('data-ssr', 'true');
  if (key) detail.setAttribute('data-key', key);

  detail.appendChild(nav);
  detail.appendChild(boxHead);
  detail.appendChild(firstBlock);

  inner.innerHTML = '';
  inner.appendChild(detail);
}
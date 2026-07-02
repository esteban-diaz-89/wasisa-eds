const TAG_MAP = {
  'tag:professional': { text: 'MÉDICO / PROFESIONAL', cls: 'cmp-tag-template--blue' },
  'tag:center':       { text: 'CENTRO MÉDICO',        cls: 'cmp-tag-template--blue' },
  'tag:asisa-center': { text: 'Centro de ASISA',      cls: 'cmp-tag-template--blank' },
  'tag:eprescription':      { text: 'Receta electrónica', cls: 'cmp-tag-template--blank' },
  'tag:online-appointment': { text: 'Cita online',        cls: 'cmp-tag-template--blank' },
  'tag:video-consultation': { text: 'Videoconsulta',      cls: 'cmp-tag-template--blank' },
};

export function buildTag({ text, cls }) {
  const div = document.createElement('div');
  div.className = `cmp-tag-template ${cls}`;
  const p = document.createElement('p');
  p.className = 'cmp-tag-template__text';
  p.textContent = text;
  div.appendChild(p);
  return div;
}

export function buildLocationCard(inner, isFirst) {
  const ul = inner.querySelector('ul');
  const tagKeys = ul
    ? [...ul.querySelectorAll('li')].map((li) => li.textContent.trim())
    : [];

  const ps = [...inner.querySelectorAll(':scope > p')];
  const specP = ps.find((p) => !p.querySelector('a'));
  const specA = inner.querySelector('a[href^="/cuadro-medico/e/"]');
  const spec = specA?.textContent.trim() || '';
  const addressP = ps.filter((p) => !p.querySelector('a') && p !== specP)[0];

  const h2 = inner.querySelector('h2');
  const h3 = inner.querySelector('h3');
  const centerA = inner.querySelector('a[href^="/cuadro-medico/c/"]');
  const mapsA = inner.querySelector('a[href*="google.com/maps"]');
  const phoneA = inner.querySelector('a[href^="tel:"]');
  const shareA = inner.querySelector('a[title="Compartir"]');
  const citaA = inner.querySelector('a[title="Pedir cita"]');

  // --- Principal tag ---
  const principalTag = document.createElement('div');
  principalTag.className = 'eds-mp-card__principal-tag';

  const mainTagKeys = ['tag:professional', 'tag:center', 'tag:asisa-center'];
  tagKeys.filter((k) => mainTagKeys.includes(k)).forEach((k) => {
    principalTag.appendChild(buildTag(TAG_MAP[k]));
  });

  const shareDiv = document.createElement('div');
  shareDiv.className = 'eds-mp-card__principal-tag--share';
  if (shareA) {
    shareA.removeAttribute('class');
    shareA.removeAttribute('title');
    shareA.textContent = 'Compartir ';
    const icon = document.createElement('i');
    icon.className = 'icon-share-021 js-button-social-media';
    shareA.appendChild(icon);
    shareDiv.appendChild(shareA);
  }
  principalTag.appendChild(shareDiv);

  // --- Bloque izquierdo ---
  const blockLeft = document.createElement('div');
  blockLeft.className = 'eds-mp-card__block';
  blockLeft.appendChild(principalTag);

  if (isFirst) {
    if (spec) {
      const specEl = document.createElement('p');
      specEl.className = 'eds-mp-card__type--speciality';
      specEl.innerHTML = `<a href="${}">${spec}</a>`;
      blockLeft.appendChild(specEl);
    }
    if (h2) {
      const nameP = document.createElement('p');
      nameP.className = 'eds-mp-card__type--name';
      nameP.textContent = h2.textContent;
      blockLeft.appendChild(nameP);
    }
    if (h3) {
      const colP = document.createElement('p');
      colP.className = 'eds-mp-card__type--num-member';
      colP.textContent = `Núm. Colegiado – ${h3.textContent}`;
      blockLeft.appendChild(colP);
    }
  } else {
    const nameP = document.createElement('p');
    nameP.className = 'eds-mp-card__type--name';
    if (centerA) {
      const a = centerA.cloneNode(true);
      a.removeAttribute('class');
      nameP.appendChild(a);
    } else {
      nameP.textContent = spec;
    }
    blockLeft.appendChild(nameP);

    if (spec) {
      const specEl = document.createElement('p');
      specEl.className = 'eds-mp-card__type--speciality';
      specEl.innerHTML = specA?.cloneNode(true);
      blockLeft.appendChild(specEl);
    }
  }

  // --- Bloque derecho ---
  const blockRight = document.createElement('div');
  blockRight.className = 'eds-mp-card__block';

  if (centerA && isFirst) {
    const p = document.createElement('p');
    p.className = 'eds-mp-card__type--center';
    p.textContent = centerA.textContent;
    blockRight.appendChild(p);
  }

  if (addressP) {
    const addrDiv = document.createElement('div');
    addrDiv.className = 'eds-mp-card__type--address';
    addrDiv.innerHTML = `<i class="icon-marker-02"></i>${addressP.textContent}`;
    blockRight.appendChild(addrDiv);
  }

  if (mapsA) {
    const locDiv = document.createElement('div');
    locDiv.className = 'eds-mp-card__type--location';
    const btn = document.createElement('div');
    btn.className = 'button-cmp';
    mapsA.className = 'button-cmp__text button-cmp__text--link button-location';
    mapsA.setAttribute('target', '_blank');
    mapsA.innerHTML = `<i class="icon-map-04 icon-large"></i> Cómo llegar`;
    btn.appendChild(mapsA);
    locDiv.appendChild(btn);
    blockRight.appendChild(locDiv);
  }

  const serviceTags = ['tag:online-appointment', 'tag:video-consultation', 'tag:eprescription'];
  const serviceTagsDiv = document.createElement('div');
  serviceTagsDiv.className = 'eds-mp-card__info--tags';
  tagKeys.filter((k) => serviceTags.includes(k)).forEach((k) => {
    serviceTagsDiv.appendChild(buildTag(TAG_MAP[k]));
  });
  if (serviceTagsDiv.children.length) blockRight.appendChild(serviceTagsDiv);

  // --- Card ---
  const card = document.createElement('div');
  card.className = 'eds-mp-card eds-mp-card--type-b eds-mp-card--blue';
  card.appendChild(blockLeft);
  card.appendChild(blockRight);

  // --- Botones --- solo se renderizan si existen en el DOM
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'eds-mp-card__info--buttons';

  if (citaA) {
    const detail = document.createElement('div');
    detail.className = 'eds-mp-card__info--buttons-detail';
    const btn = document.createElement('div');
    btn.className = 'button-cmp';
    citaA.className = 'btn button-cmp__text button-cmp__text--primary js-medical-picture-appointment';
    btn.appendChild(citaA);
    detail.appendChild(btn);
    buttonsDiv.appendChild(detail);
  }

  if (phoneA) {
    const detail = document.createElement('div');
    detail.className = 'eds-mp-card__info--buttons-detail';
    const btn = document.createElement('div');
    btn.className = 'button-cmp';
    phoneA.className = 'btn button-cmp__text button-cmp__text--tertiary js-medical-picture-detail';
    btn.appendChild(phoneA);
    detail.appendChild(btn);
    buttonsDiv.appendChild(detail);
  }

  if (buttonsDiv.children.length) card.appendChild(buttonsDiv);

  return card;
}
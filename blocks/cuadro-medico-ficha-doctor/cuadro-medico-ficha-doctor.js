const TAG_MAP = {
  'tag:professional': { text: 'MÉDICO / PROFESIONAL', cls: 'cmp-tag-template--blue' },
  'tag:center':       { text: 'CENTRO MÉDICO',        cls: 'cmp-tag-template--blue' },
  'tag:asisa-center': { text: 'Centro de ASISA',      cls: 'cmp-tag-template--blank' },
  'tag:eprescription':      { text: 'Receta electrónica', cls: 'cmp-tag-template--blank' },
  'tag:online-appointment': { text: 'Cita online',        cls: 'cmp-tag-template--blank' },
  'tag:video-consultation': { text: 'Videoconsulta',      cls: 'cmp-tag-template--blank' },
};

function buildTag({ text, cls }) {
  const div = document.createElement('div');
  div.className = `cmp-tag-template ${cls}`;
  div.innerHTML = `<div class="cmp-tag-template__text">${text}</div>`;
  return div;
}

function buildBreadcrumb(ol) {
  const nav = document.createElement('nav');
  nav.className = 'cmp-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');
  const newOl = document.createElement('ol');
  newOl.className = 'cmp-breadcrumb__list';
  [...ol.querySelectorAll('li')].forEach((li, i, arr) => {
    const isLast = i === arr.length - 1;
    const a = li.querySelector('a');
    const newLi = document.createElement('li');
    newLi.className = `cmp-breadcrumb__item${isLast ? ' cmp-breadcrumb__item--active' : ''}`;
    if (isLast) {
      newLi.textContent = a?.textContent || li.textContent;
    } else if (a) {
      a.className = 'cmp-breadcrumb__item-link';
      newLi.appendChild(a);
    }
    newOl.appendChild(newLi);
  });
  nav.appendChild(newOl);
  return nav;
}

function buildLocationCard(row, isFirst) {
  // Leer datos de la fila — cada elemento tiene un rol claro por posición/tipo
  const ul = row.querySelector('ul');
  const tagKeys = ul ? [...ul.querySelectorAll('li')].map((li) => li.textContent.trim()) : [];

  const ps = [...row.querySelectorAll('p')];
  // El primer p sin link es la especialidad
  const specP = ps.find((p) => !p.querySelector('a'));
  const spec = specP?.textContent.trim() || '';

  const h2 = row.querySelector('h2'); // nombre del médico (solo primera ubicación)
  const h3 = row.querySelector('h3'); // número colegiado (solo primera ubicación)

  const centerA = row.querySelector('a[href^="/cuadro-medico/c/"]');
  const addressP = ps.find((p) => !p.querySelector('a') && p !== specP);
  const mapsA = row.querySelector('a[href*="google.com/maps"]');
  const phoneA = row.querySelector('a[href^="tel:"]');
  const shareA = row.querySelector('a[title="Compartir"]');
  const citaA = row.querySelector('a[title^="Pedir cita"]');

  // --- Tags ---
  const tagsDiv = document.createElement('div');
  tagsDiv.className = 'eds-mp-card__principal-tag';
  tagKeys.forEach((key) => {
    const meta = TAG_MAP[key];
    if (meta) tagsDiv.appendChild(buildTag(meta));
  });
  if (shareA) {
    shareA.className = 'eds-mp-card__principal-tag--share';
    shareA.target = '_blank';
    shareA.rel = 'noopener';
    shareA.innerHTML = `Compartir <i class="icon-share-021"></i>`;
    tagsDiv.appendChild(shareA);
  }

  // --- Bloque izquierdo ---
  const blockLeft = document.createElement('div');
  blockLeft.className = 'eds-mp-card__block';
  blockLeft.appendChild(tagsDiv);

  if (isFirst) {
    if (spec) {
      const specEl = document.createElement('p');
      specEl.className = 'eds-mp-card__type--speciality';
      specEl.innerHTML = `<a href="">${spec}</a>`;
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
      nameP.appendChild(a);
    } else {
      nameP.textContent = spec;
    }
    blockLeft.appendChild(nameP);
  }

  // --- Bloque derecho ---
  const blockRight = document.createElement('div');
  blockRight.className = 'eds-mp-card__block';

  if (centerA && isFirst) {
    const p = document.createElement('p');
    p.className = 'eds-mp-card__type--center';
    p.appendChild(centerA);
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
    mapsA.target = '_blank';
    mapsA.rel = 'noopener';
    mapsA.innerHTML = `<i class="icon-map-04 icon-large"></i>Cómo llegar`;
    btn.appendChild(mapsA);
    locDiv.appendChild(btn);
    blockRight.appendChild(locDiv);
  }

  // Service tags (solo los de servicios, no professional/center/asisa-center)
  const serviceTags = ['tag:online-appointment', 'tag:video-consultation', 'tag:eprescription'];
  const serviceTagsDiv = document.createElement('div');
  serviceTagsDiv.className = 'eds-mp-card__info--tags';
  tagKeys.filter((k) => serviceTags.includes(k)).forEach((k) => {
    serviceTagsDiv.appendChild(buildTag(TAG_MAP[k]));
  });
  if (serviceTagsDiv.children.length) blockRight.appendChild(serviceTagsDiv);

  // --- Card ---
  const card = document.createElement('div');
  card.className = `eds-mp-card eds-mp-card--type-b${isFirst ? ' eds-mp-card--blue' : ''}`;
  card.appendChild(blockLeft);
  card.appendChild(blockRight);

  // Botones (teléfono)
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'eds-mp-card__info--buttons';
  if (phoneA) {
    const detail = document.createElement('div');
    detail.className = 'eds-mp-card__info--buttons-detail';
    const btn = document.createElement('div');
    btn.className = 'button-cmp';
    phoneA.className = 'button-cmp__text button-cmp__text--tertiary';
    btn.appendChild(phoneA);
    detail.appendChild(btn);
    buttonsDiv.appendChild(detail);
  }
  if (citaA) {
      const btn = document.createElement('div');
      btn.className = 'button-cmp';
      citaA.className = 'btn button-cmp__text button-cmp__text--primary';
      citaA.target = '_blank';
      citaA.rel = 'noopener';
      btn.appendChild(citaA);
      detail.appendChild(btn);
      buttonsDiv.appendChild(btn);
    }
  card.appendChild(buttonsDiv);

  const userContent = document.createElement('section');
  userContent.className = 'eds-mp-user__content';
  userContent.appendChild(card);

  // --- Spec card (título especialidad + pedir cita) ---
//  const specSection = document.createElement('section');
//  specSection.className = 'eds-mp-user__content';
//  const specCenter = document.createElement('div');
//  specCenter.className = 'eds-mp-spec-center';
//  const specHeader = document.createElement('div');
//  specHeader.className = 'eds-mp-spec-center__header';
//  const specTitle = document.createElement('h3');
//  specTitle.className = 'eds-mp-spec-center__header--title';
//  specTitle.textContent = spec;
//  specHeader.appendChild(specTitle);
//
//  const actions = document.createElement('div');
//  actions.className = 'eds-mp-spec-center__header--actions';
//  if (phoneA) {
//    const btn = document.createElement('div');
//    btn.className = 'button-cmp';
//    const phoneClone = phoneA.cloneNode(true);
//    phoneClone.className = 'button-cmp__text button-cmp__text--tertiary';
//    btn.appendChild(phoneClone);
//    actions.appendChild(btn);
//  }
//
//  specHeader.appendChild(actions);
//  specCenter.appendChild(specHeader);
//  specSection.appendChild(specCenter);

  const article = document.createElement('article');
  article.className = 'eds-mp-user';
  article.appendChild(userContent);
  //article.appendChild(specSection);

  return article;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  // Fila 0 siempre es la cabecera
  const headerRow = rows[0];
  const ol = headerRow.querySelector('ol');
  const h1 = headerRow.querySelector('h1');
  const introP = headerRow.querySelector('p');

  // Filas 1..N son ubicaciones
  const locationRows = rows.slice(1);

  // Construir DOM final
  const detail = document.createElement('div');
  detail.className = 'cmp-medical-detail';

  if (ol) detail.appendChild(buildBreadcrumb(ol));

  if (h1 || introP) {
    const boxHead = document.createElement('section');
    boxHead.className = 'eds-mp-box-head';
    if (h1) { h1.className = 'eds-mp-box-head--title'; boxHead.appendChild(h1); }
    if (introP) { introP.className = 'eds-mp-box-head--text'; boxHead.appendChild(introP); }
    detail.appendChild(boxHead);
  }

  // Primera ubicación
  if (locationRows[0]) {
    detail.appendChild(buildLocationCard(locationRows[0], true));
  }

  // Ubicaciones adicionales
  if (locationRows.length > 1) {
    const subtitle = document.createElement('h2');
    subtitle.className = 'eds-mp-user__subtitle';
    // El nombre viene del h2 de la primera fila de ubicación
    const doctorName = locationRows[0].querySelector('h2')?.textContent || '';
    subtitle.textContent = `${doctorName} también pasa consulta en estos centros`;
    detail.appendChild(subtitle);

    locationRows.slice(1).forEach((row) => {
      detail.appendChild(buildLocationCard(row, false));
    });
  }

  block.innerHTML = '';
  block.appendChild(detail);
}
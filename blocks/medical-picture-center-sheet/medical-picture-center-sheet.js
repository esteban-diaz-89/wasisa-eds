export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  // ----------------------------
  // GET DATA
  // ----------------------------

  const ps = [...inner.querySelectorAll('p')]
    .filter(p => !p.querySelector('a'));

  const links = [...inner.querySelectorAll('a')];
  const uls = [...inner.querySelectorAll('ul')];

  const providerType = ps[0]?.textContent.trim(); // Centro Médico / Hospital / Lab
  const businessGroup = ps[1]?.textContent.trim(); // asisa
  const name = ps[2]?.textContent.trim();
  const address = ps[3]?.textContent.trim();

  const maps = links.find(a => a.textContent.trim() === 'maps');
  const phone = links.find(a => a.getAttribute('title') === 'phone');
  const share = links.find(a => a.textContent.trim() === 'share');

  const mainTags = uls[0]
    ? [...uls[0].querySelectorAll('li')].map(li => li.textContent.trim())
    : [];

  const secondaryTags = uls[1]
    ? [...uls[1].querySelectorAll('li')].map(li => li.textContent.trim())
    : [];

  // ----------------------------
  // BUILD UI
  // ----------------------------

  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-user';

  const content = document.createElement('div');
  content.className = 'eds-mp-user__content';

  const card = document.createElement('div');
  card.className = 'eds-mp-card eds-mp-card--type-b eds-mp-card--blue';

  // ----------------------------
  // LEFT BLOCK
  // ----------------------------

  const left = document.createElement('div');
  left.className = 'eds-mp-card__block';

  const principalTags = document.createElement('div');
  principalTags.className = 'eds-mp-card__principal-tag';

  // Tag principal
  if (providerType) {
    const mainTag = document.createElement('div');
    mainTag.className = 'cmp-tag-template cmp-tag-template--blue';
    mainTag.innerHTML = `<p class="cmp-tag-template__text">${providerType}</p>`;
    principalTags.appendChild(mainTag);
  }

  // businessGroup (ASISA)
  if (businessGroup === 'asisa') {
    const asisaTag = document.createElement('div');
    asisaTag.className = 'cmp-tag-template cmp-tag-template--blank';
    asisaTag.innerHTML = `<p class="cmp-tag-template__text">Centro de ASISA</p>`;
    principalTags.appendChild(asisaTag);
  }

  // SHARE
  if (share) {
    share.className = 'eds-mp-card__principal-tag--share';
    share.innerHTML = `Compartir <i class="icon-share-021"></i>`;
    principalTags.appendChild(share);
  }

  left.appendChild(principalTags);

  // NAME
  if (name) {
    const nameEl = document.createElement('p');
    nameEl.className = 'eds-mp-card__type--name';
    nameEl.textContent = name;
    left.appendChild(nameEl);
  }

  // ----------------------------
  // RIGHT BLOCK
  // ----------------------------

  const right = document.createElement('div');
  right.className = 'eds-mp-card__block';

  // ADDRESS
  if (address) {
    const addr = document.createElement('div');
    addr.className = 'eds-mp-card__type--address';
    addr.innerHTML = `<i class="icon-marker-02"></i>${address}`;
    right.appendChild(addr);
  }

  // MAPS
  if (maps) {
    const location = document.createElement('div');
    location.className = 'eds-mp-card__type--location';

    const btn = document.createElement('div');
    btn.className = 'button-cmp';

    maps.className = 'button-cmp__text button-cmp__text--link button-location';
    maps.innerHTML = `<i class="icon-map-04 icon-large"></i>Cómo llegar`;

    btn.appendChild(maps);
    location.appendChild(btn);
    right.appendChild(location);
  }

  // TAGS SECUNDARIOS
  if (secondaryTags.length) {
    const secTags = document.createElement('div');
    secTags.className = 'eds-mp-card__info--tags';

    secondaryTags.forEach(tag => {
      const div = document.createElement('div');
      div.className = 'cmp-tag-template cmp-tag-template--blank';

      const label =
        tag === 'online' ? 'Cita online' :
        tag === 'video' ? 'Videoconsulta' :
        tag === 'eprescription' ? 'Receta electrónica' :
        tag;

      div.innerHTML = `<p class="cmp-tag-template__text">${label}</p>`;
      secTags.appendChild(div);
    });

    right.appendChild(secTags);
  }

  // ----------------------------
  // BUTTONS
  // ----------------------------

  const buttons = document.createElement('div');
  buttons.className = 'eds-mp-card__info--buttons';

  if (phone) {
    const wrap = document.createElement('div');
    wrap.className = 'eds-mp-card__info--buttons-detail';

    const btn = document.createElement('div');
    btn.className = 'button-cmp';

    phone.className = 'button-cmp__text button-cmp__text--tertiary';

    btn.appendChild(phone);
    wrap.appendChild(btn);
    buttons.appendChild(wrap);
  }

  // ----------------------------
  // FINAL
  // ----------------------------

  card.appendChild(left);
  card.appendChild(right);
  card.appendChild(buttons);

  content.appendChild(card);
  wrapper.appendChild(content);

  block.textContent = '';
  block.appendChild(wrapper);
}
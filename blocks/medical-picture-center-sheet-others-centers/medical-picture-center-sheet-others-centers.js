export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const title = inner.querySelector('h2');
  const list = inner.querySelector('ul');
  if (!list) return;

  const items = [...list.children];

  // ----------------------------
  // WRAPPER
  // ----------------------------
  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-doctor-center';

  if (title) {
    wrapper.appendChild(title);
  }

  const container = document.createElement('ul');
  container.className = 'eds-mp-doctor-center__container';

  // ----------------------------
  // LOOP CENTERS
  // ----------------------------
  items.forEach(item => {
    const ps = item.querySelectorAll(':scope > p');

    const providerType = ps[0]?.textContent.trim(); // Hospital / Laboratorio
    const businessGroup = ps[1]?.textContent.trim(); // 'asisa' o vacío

    const nameLink = item.querySelector('a[title="detail"]');
    const address = ps[2]?.textContent.trim();

    const shareA = item.querySelector('a[title="share"]');

    const phone = item.querySelector('a[title="phone"]');
    const tagsList = item.querySelector('ul');

    const li = document.createElement('li');
    li.className = 'eds-mp-doctor-center__container--item';

    // ----------------------------
    // DT (MAIN CONTENT)
    // ----------------------------
    const dt = document.createElement('dt');

    // ----------------------------
    // TAGS PRINCIPALES
    // ----------------------------
    const tagsPrincipal = document.createElement('ul');
    tagsPrincipal.className = 'eds-mp-doctor-center__tags-principal';

    // ✅ providerType (tag azul)
    if (providerType) {
      const mainTag = document.createElement('li');
      mainTag.className = 'cmp-tag-template cmp-tag-template--blue';
      mainTag.innerHTML = `<p class="cmp-tag-template__text">${providerType}</p>`;
      tagsPrincipal.appendChild(mainTag);
    }

    // ✅ businessGroup (ASISA)
    if (businessGroup === 'asisa') {
      const asisaTag = document.createElement('li');
      asisaTag.className = 'cmp-tag-template cmp-tag-template--blank';
      asisaTag.innerHTML = `<p class="cmp-tag-template__text">Centro de ASISA</p>`;
      tagsPrincipal.appendChild(asisaTag);
    }

    // ✅ SHARE (siempre)
    const share = document.createElement('li');
    share.className = 'eds-mp-doctor-center__tags-principal--share';
    share.innerHTML = `<a href="${shareA?.href}">Compartir <i class="icon-share-021"></i></a>`;
    tagsPrincipal.appendChild(share);

    dt.appendChild(tagsPrincipal);

    // ----------------------------
    // NAME
    // ----------------------------
    const nameEl = document.createElement('p');
    nameEl.className = 'eds-mp-doctor-center__name';

    if (nameLink) {
      nameEl.appendChild(nameLink);
    }

    dt.appendChild(nameEl);

    // ----------------------------
    // ADDRESS
    // ----------------------------
    if (address) {
      const addr = document.createElement('p');
      addr.className = 'eds-mp-doctor-center__address';
      addr.innerHTML = `<i class="icon-marker-02"></i>${address}`;
      dt.appendChild(addr);
    }

    // ----------------------------
    // TAGS SECUNDARIOS
    // ----------------------------
    if (tagsList) {
      const secTags = document.createElement('ul');
      secTags.className = 'eds-mp-doctor-center__tags-secondary';

      [...tagsList.children].forEach(tag => {
        const li = document.createElement('li');
        li.className = 'cmp-tag-template cmp-tag-template--blank';

        li.innerHTML = `<p class="cmp-tag-template__text">${tag.textContent}</p>`;
        secTags.appendChild(li);
      });

      dt.appendChild(secTags);
    }

    li.appendChild(dt);

    // ----------------------------
    // BUTTONS
    // ----------------------------
    const buttons = document.createElement('ul');
    buttons.className = 'eds-mp-doctor-center__buttons';

    // TEL
    if (phone) {
      const btnLi = document.createElement('li');
      btnLi.className = 'button-cmp';

      phone.className = 'button-cmp__text button-cmp__text--tertiary';

      btnLi.appendChild(phone);
      buttons.appendChild(btnLi);
    }

    // DETALLE (mismo link del nombre)
    if (nameLink) {
      const btnLi = document.createElement('li');
      btnLi.className = 'button-cmp';

      const detailBtn = nameLink.cloneNode(true);
      detailBtn.className = 'button-cmp__text button-cmp__text--primary';
      detailBtn.textContent = 'Ver detalle';

      btnLi.appendChild(detailBtn);
      buttons.appendChild(btnLi);
    }

    li.appendChild(buttons);

    container.appendChild(li);
  });

  wrapper.appendChild(container);

  // ----------------------------
  // FINAL
  // ----------------------------
  block.textContent = '';
  block.appendChild(wrapper);
}

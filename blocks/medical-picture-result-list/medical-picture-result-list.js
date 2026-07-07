const DEFAULT_ITEMS_PER_PAGE = 10;

function createElement(tagName, className) {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  return el;
}

function createTag(text, variant = 'blank') {
  const wrapper = createElement('div', `cmp-tag-template cmp-tag-template--${variant}`);
  const label = createElement('p', 'cmp-tag-template__text');
  label.textContent = text;
  wrapper.appendChild(label);
  return wrapper;
}

function createButton(link, variant = 'tertiary') {
  const wrapper = createElement('div', 'button-cmp');
  const anchor = link.cloneNode(true);
  anchor.className = `btn button-cmp__text button-cmp__text--${variant}`;
  anchor.target = '_blank';
  anchor.rel = 'noopener';
  wrapper.appendChild(anchor);
  return wrapper;
}

function parseCardData(cardGroup, isProfessionalTab) {
  // fixed-position mapping: each <li> index corresponds to a known field
  const fields = [...cardGroup.querySelectorAll(':scope > li')];
  if (!fields.length) return null;

  const getText = (i) => (fields[i] ? fields[i].textContent.trim() : '');
  const getAnchor = (i) => {
    if (!fields[i]) return null;
    const a = fields[i].querySelector('a[href]');
    if (!a) return null;
    const href = a.getAttribute('href') || '';
    if (!href || href.trim() === '#') return null;
    return a;
  };

  const mainTag = getText(0) || '';
  const secondaryTag = getText(1) || '';
  const thirdTag = getText(2) || '';

  const speciality = getText(3) || '';
  const name = getText(4) || '';
  const numMember = getText(5) || '';
  const center = getText(6) || '';
  const address = getText(7) || '';

  const mapsLink = getAnchor(8);
  const phoneLink = getAnchor(9);
  const serviceTag = getText(10) || '';
  const detailLink = getAnchor(11);
  const appointmentLink = getAnchor(12);

  const actionLinks = [detailLink, appointmentLink].filter(Boolean);

  const card = createElement('div', 'eds-mp-card');
  const principalTags = createElement('div', 'eds-mp-card__principal-tag');
  if (mainTag) principalTags.appendChild(createTag(mainTag, 'blue'));
  if (secondaryTag) principalTags.appendChild(createTag(secondaryTag, 'blank'));
  if (thirdTag) principalTags.appendChild(createTag(thirdTag, 'blank'));

  const info = createElement('div', 'eds-mp-card__info');
  const contact = createElement('div', 'eds-mp-card__info--contact');
  const blockLeft = createElement('div', 'eds-mp-card__block');

  blockLeft.appendChild(principalTags);
  if (speciality) {
    const spec = createElement('p', 'eds-mp-card__type--speciality');
    spec.textContent = speciality;
    blockLeft.appendChild(spec);
  }
  if (name) {
    const nameEl = createElement('p', 'eds-mp-card__type--name');
    nameEl.textContent = name;
    blockLeft.appendChild(nameEl);
  }
  if (numMember) {
    const memberEl = createElement('p', 'eds-mp-card__type--num-member');
    memberEl.textContent = numMember;
    blockLeft.appendChild(memberEl);
  }
  contact.appendChild(blockLeft);

  const blockRight = createElement('div', 'eds-mp-card__block');
  if (isProfessionalTab && center) {
    const centerEl = createElement('p', 'eds-mp-card__type--center');
    centerEl.textContent = center;
    blockRight.appendChild(centerEl);
  }
  if (address) {
    const addressEl = createElement('div', 'eds-mp-card__type--address');
    const icon = createElement('i');
    icon.className = 'icon-marker-02';
    addressEl.appendChild(icon);
    addressEl.appendChild(document.createTextNode(address));
    blockRight.appendChild(addressEl);
  }

  if (mapsLink || phoneLink) {
    const locationRow = createElement('div', 'eds-mp-card__info--location');
    if (mapsLink) {
      const location = createElement('div', 'eds-mp-card__type--location');
      const wrapper = createElement('div', 'button-cmp');
      const mapsAnchor = mapsLink.cloneNode(true);
      mapsAnchor.className = 'button-cmp__text button-cmp__text--link button-location';
      mapsAnchor.target = '_blank';
      mapsAnchor.rel = 'noopener';
      if (!mapsAnchor.textContent.trim()) mapsAnchor.textContent = 'Cómo llegar';
      const icon = createElement('i');
      icon.className = 'icon-map-04 icon-large';
      mapsAnchor.insertBefore(icon, mapsAnchor.firstChild);
      wrapper.appendChild(mapsAnchor);
      location.appendChild(wrapper);
      locationRow.appendChild(location);
    }
    if (phoneLink) {
      const phone = createElement('div', 'eds-mp-card__type--phone');
      const wrapper = createElement('div', 'button-cmp');
      const phoneAnchor = phoneLink.cloneNode(true);
      phoneAnchor.className = 'button-cmp__text button-cmp__text--link button-phone';
      phoneAnchor.target = '_blank';
      phoneAnchor.rel = 'noopener';
      const icon = createElement('i');
      icon.className = 'icon-phone';
      const phoneText = document.createTextNode((phoneAnchor.getAttribute('href') || '').replace('tel:', ''));
      phoneAnchor.textContent = '';
      phoneAnchor.appendChild(icon);
      phoneAnchor.appendChild(phoneText);
      wrapper.appendChild(phoneAnchor);
      phone.appendChild(wrapper);
      locationRow.appendChild(phone);
    }
    blockRight.appendChild(locationRow);
  }

  if (serviceTag) {
    const tagsRow = createElement('div', 'eds-mp-card__info--tags');
    tagsRow.appendChild(createTag(serviceTag, 'blank'));
    blockRight.appendChild(tagsRow);
  }

  contact.appendChild(blockRight);
  info.appendChild(contact);
  card.appendChild(info);

  if (actionLinks.length) {
    const buttonsRow = createElement('div', 'eds-mp-card__info--buttons');
    actionLinks.forEach((link, index) => {
      const variant = index === 0 ? 'tertiary' : 'primary';
      const detail = createElement('div', 'eds-mp-card__info--buttons-detail');
      detail.appendChild(createButton(link, variant));
      buttonsRow.appendChild(detail);
    });
    card.appendChild(buttonsRow);
  }

  return card;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const itemsPerPage = parseInt(block.dataset.itemsPerPage, 10) || DEFAULT_ITEMS_PER_PAGE;

  const headerList = inner.querySelector(':scope > ul:nth-of-type(1)');
  const tabList = inner.querySelector(':scope > ul:nth-of-type(2)');
  if (!headerList || !tabList) return;

  const tabs = [...headerList.children].filter((child) => child.tagName === 'LI');
  const tabContents = [...tabList.children].filter((child) => child.tagName === 'LI');
  if (!tabContents.length) return;

  const tabData = tabContents.map((tabItem, index) => {
    const title = tabs[index]?.textContent.trim() || `Tab ${index + 1}`;
    const isProfessionalTab = index === 0;
    const cards = [...tabItem.querySelectorAll(':scope > ul')]
      .map((cardGroup) => parseCardData(cardGroup, isProfessionalTab))
      .filter(Boolean);
    return { title, cards };
  });

  const section = createElement('section', 'default-content-wrapper');
  const tabsWrapper = createElement('div', 'eds-mp-tabs');
  const nav = createElement('ul', 'eds-mp-tabs__nav');
  const contentContainer = createElement('div', 'eds-mp-tabs__container');

  const pageIndexes = tabData.map(() => 0);

  function setCurrentPage(tabIndex, nextPage) {
    const pageCount = Math.ceil(tabData[tabIndex].cards.length / itemsPerPage);
    if (!pageCount) return;

    const safePage = Math.max(0, Math.min(nextPage, pageCount - 1));
    if (pageIndexes[tabIndex] === safePage) return;

    pageIndexes[tabIndex] = safePage;
    updatePage(tabIndex);
  }

  function renderPagination(tabIndex, cards) {
    const pageCount = Math.ceil(cards.length / itemsPerPage);
    if (pageCount <= 1) return null;

    const pagination = createElement('ul', 'eds-mp-pagination');
    pagination.setAttribute('role', 'navigation');
    pagination.setAttribute('aria-label', `Paginación ${tabData[tabIndex].title}`);

    const createPageButton = (label, page, disabled = false, isArrow = false) => {
      const item = createElement('li');
      item.textContent = label;
      if (disabled) item.classList.add('disabled');
      if (isArrow) item.setAttribute('aria-hidden', 'true');
      item.addEventListener('click', () => {
        if (item.classList.contains('disabled')) return;
        const currentPage = pageIndexes[tabIndex];
        const targetPage = isArrow
          ? (label === '⟨' ? currentPage - 1 : currentPage + 1)
          : page;
        setCurrentPage(tabIndex, targetPage);
      });
      return item;
    };

    const prev = createPageButton('⟨', pageIndexes[tabIndex] - 1, pageIndexes[tabIndex] === 0, true);
    pagination.appendChild(prev);

    for (let i = 0; i < pageCount; i += 1) {
      const pageItem = createPageButton(String(i + 1), i, false, false);
      if (pageIndexes[tabIndex] === i) pageItem.classList.add('active');
      pageItem.title = `Page ${i + 1}`;
      pagination.appendChild(pageItem);
    }

    const next = createPageButton('⟩', pageIndexes[tabIndex] + 1, pageIndexes[tabIndex] >= pageCount - 1, true);
    pagination.appendChild(next);

    return pagination;
  }

  function updatePage(tabIndex) {
    const contentArea = contentContainer.querySelector(`#tab${tabIndex + 1}`);
    if (!contentArea) return;
    const cards = [...contentArea.querySelectorAll('.eds-mp-card')];
    const page = pageIndexes[tabIndex];
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    cards.forEach((card, cardIndex) => {
      const hidden = cardIndex < start || cardIndex >= end;
      card.classList.toggle('hidden', hidden);
    });

    const pagination = contentArea.querySelector('.eds-mp-pagination');
    if (!pagination) return;
    const pageButtons = [...pagination.children].filter((li) => !['⟨', '⟩'].includes(li.textContent));
    pageButtons.forEach((pageButton, index) => {
      pageButton.classList.toggle('active', index === page);
    });
    const prevButton = pagination.children[0];
    const nextButton = pagination.children[pagination.children.length - 1];
    prevButton.classList.toggle('disabled', page === 0);
    nextButton.classList.toggle('disabled', page === Math.ceil(cards.length / itemsPerPage) - 1);
  }

  function activateTab(tabIndex) {
    const navItems = [...nav.children];
    navItems.forEach((item, index) => {
      const active = index === tabIndex;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });

    const contentAreas = [...contentContainer.children];
    contentAreas.forEach((area, index) => {
      const active = index === tabIndex;
      area.classList.toggle('hidden', !active);
      area.style.display = active ? 'flex' : 'none';
    });

    updatePage(tabIndex);
  }

  tabData.forEach((tab, tabIndex) => {
    const navItem = createElement('li', 'eds-mp-tabs__nav--item');
    navItem.textContent = tab.title;
    navItem.setAttribute('role', 'tab');
    navItem.setAttribute('aria-controls', `tab${tabIndex + 1}`);
    navItem.setAttribute('aria-selected', 'false');
    if (tabIndex === 0) navItem.classList.add('active');
    navItem.addEventListener('click', () => activateTab(tabIndex));
    nav.appendChild(navItem);

    const contentArea = createElement('div', 'eds-mp-tabs__content');
    contentArea.id = `tab${tabIndex + 1}`;
    contentArea.style.display = tabIndex === 0 ? 'flex' : 'none';
    if (tabIndex !== 0) contentArea.classList.add('hidden');

    tab.cards.forEach((card) => {
      card.classList.add('eds-mp-card');
      contentArea.appendChild(card);
    });

    const pagination = renderPagination(tabIndex, tab.cards);
    if (pagination) contentArea.appendChild(pagination);
    contentContainer.appendChild(contentArea);
  });

  tabsWrapper.appendChild(nav);
  tabsWrapper.appendChild(contentContainer);
  section.appendChild(tabsWrapper);

  clearElement(block);
  block.appendChild(section);
  activateTab(0);
}


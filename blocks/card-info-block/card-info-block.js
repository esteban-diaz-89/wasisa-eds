export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const sourceOl = inner.querySelector('ol');
  if (!sourceOl) return;

  const textLi = sourceOl.querySelector('li');
  const privateAreaLink = sourceOl.querySelector('a[title="private-area"]');

  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-box-info';

  const content = document.createElement('div');
  content.className = 'eds-mp-box-info__content';

  // Icono
  const iconUl = document.createElement('ul');
  const iconLi = document.createElement('li');
  iconLi.className = 'icon-informacion';
  iconUl.appendChild(iconLi);

  // Texto y enlace
  const contentOl = document.createElement('ol');

  if (textLi) {
    const infoLi = document.createElement('li');
    infoLi.textContent = textLi.textContent.trim();
    contentOl.appendChild(infoLi);
  }

  if (privateAreaLink) {
    const linkLi = document.createElement('li');

    privateAreaLink.textContent = 'Ir a mi área privada';

    linkLi.appendChild(privateAreaLink);
    contentOl.appendChild(linkLi);
  }

  content.appendChild(iconUl);
  content.appendChild(contentOl);

  wrapper.appendChild(content);

  block.replaceChildren(wrapper);
}
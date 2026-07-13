/**
 * Bloque "cuadro-medico-otras-provincias"
 *
 * Grid de cards con otras provincias que tienen la misma especialidad.
 * Sin parámetros AEM — lee la URL:
 *   /cuadro-medico/p/{provSlug}/pe/{specSlug}
 */

export default function decorate(block) {
  const sourceInner = block.querySelector(':scope > div > div');
  if (!sourceInner) return;

  const section = document.createElement('section');
  section.className = 'eds-mp-other-localities';

  const wrapper = document.createElement('div');

  const originalTitle = sourceInner.querySelector('h4');
  if (originalTitle) {
    originalTitle.removeAttribute('id');
    wrapper.appendChild(originalTitle);
  }

  const originalList = sourceInner.querySelector('ul');
  if (originalList) {
    const newList = document.createElement('ul');

    originalList.querySelectorAll(':scope > li').forEach((item) => {
      const newItem = document.createElement('li');
      const orderedList = item.querySelector('ol');

      if (orderedList) {
        newItem.appendChild(orderedList);
      }

      const linkWrapper = document.createElement('p');
      linkWrapper.className = 'eds-mp-other-localities-blue__link';

      const originalLink = item.querySelector('a');
      const link = document.createElement('a');
      link.href = originalLink?.getAttribute('href') || '#ni';

      const icon = document.createElement('i');
      icon.className = 'icon-arrow-right';
      link.appendChild(icon);

      linkWrapper.appendChild(link);
      newItem.appendChild(linkWrapper);
      newList.appendChild(newItem);
    });

    wrapper.appendChild(newList);
  }

  section.appendChild(wrapper);
  block.appendChild(section);
}

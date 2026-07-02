import { buildLocationCard } from '../../scripts/utils/doctor-detail-utils.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-user';

  // Fila 0: solo el h2
  const firstInner = rows[0]?.querySelector(':scope > div');
  if (firstInner) {
    const h2 = firstInner.querySelector('h2');
    if (h2) {
      const subtitleContent = document.createElement('div');
      subtitleContent.className = 'eds-mp-user__content';
      h2.className = 'eds-mp-user__subtitle';
      subtitleContent.appendChild(h2);
      wrapper.appendChild(subtitleContent);
    }
  }

  // Filas 1..N: todas las cards dentro de un único eds-mp-user__content
  const cardsContent = document.createElement('div');
  cardsContent.className = 'eds-mp-user__content';

  rows.slice(1).forEach((row) => {
    const inner = row.querySelector(':scope > div');
    if (!inner) return;
    cardsContent.appendChild(buildLocationCard(inner, false));
  });

  if (cardsContent.children.length) wrapper.appendChild(cardsContent);

  block.innerHTML = '';
  block.appendChild(wrapper);
}
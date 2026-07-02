import { buildLocationCard } from '../../scripts/utils/doctor-detail-utils.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-user';

  rows.forEach((row) => {
    const inner = row.querySelector(':scope > div');
    if (!inner) return;
    const userContent = document.createElement('div');
    userContent.className = 'eds-mp-user__content';
    userContent.appendChild(buildLocationCard(inner, true));
    wrapper.appendChild(userContent);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
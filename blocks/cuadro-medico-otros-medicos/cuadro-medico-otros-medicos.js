export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  const h2 = inner.querySelector('h2');
  const lis = [...inner.querySelectorAll('li')];

  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-spec';

  h2.className = 'eds-mp-spec-title';
  wrapper.appendChild(h2);

  const ul = document.createElement('ul');
  ul.className = 'eds-mp-spec-list';

  lis.forEach((li) => {
    const ps = [...li.querySelectorAll('p')];
    const genderEl = ps.find((p) => p.textContent.startsWith('gender:'));
    const nameEl = ps.find((p) => !p.textContent.startsWith('gender:') && !p.querySelector('a'));
    const specEl = ps.filter((p) => !p.textContent.startsWith('gender:') && !p.querySelector('a'))[1];
    const linkEl = ps.find((p) => p.querySelector('a'));

    const isFemale = genderEl?.textContent.trim() === 'gender:female';

    li.className = 'eds-mp-spec-item';
    li.innerHTML = ''; // limpiamos el li para reconstruirlo ordenado

    const icon = document.createElement('i');
    icon.className = isFemale ? 'icon-personal-asisa-mujer' : 'icon-personal-asisa-hombre';
    li.appendChild(icon);

    if (nameEl) {
      nameEl.className = 'eds-mp-spec-item--name';
      li.appendChild(nameEl);
    }
    if (specEl) {
      specEl.className = 'eds-mp-spec-item--spec';
      li.appendChild(specEl);
    }
    if (linkEl) {
      linkEl.querySelector('a')?.removeAttribute('class');
      li.appendChild(linkEl);
    }

    ul.appendChild(li);
  });

  wrapper.appendChild(ul);
  inner.innerHTML = '';
  inner.appendChild(wrapper);
}
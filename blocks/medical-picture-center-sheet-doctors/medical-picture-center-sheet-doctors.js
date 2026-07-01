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
  wrapper.className = 'eds-mp-spec';

  if (title) {
    title.className = 'eds-mp-spec-title';
    wrapper.appendChild(title);
  }

  const newList = document.createElement('ul');
  newList.className = 'eds-mp-spec-list';

  // ----------------------------
  // LOOP DOCTORS
  // ----------------------------
  items.forEach(item => {
    const ps = item.querySelectorAll('p');

    const gender = ps[0]?.textContent.trim();   // H / V
    const name = ps[1]?.textContent.trim();
    const spec = ps[2]?.textContent.trim();

    // ✅ robusto (aunque EDS meta wrappers)
    const profile = item.querySelector('a[title="profile"]');

    const li = document.createElement('li');
    li.className = 'eds-mp-spec-item';

    // ----------------------------
    // ICON
    // ----------------------------
    const icon = document.createElement('i');
    icon.className = gender === 'H'
      ? 'icon-personal-asisa-mujer'
      : 'icon-personal-asisa-hombre';

    li.appendChild(icon);

    // ----------------------------
    // NAME
    // ----------------------------
    if (name) {
      const nameEl = document.createElement('p');
      nameEl.className = 'eds-mp-spec-item--name';
      nameEl.textContent = name;
      li.appendChild(nameEl);
    }

    // ----------------------------
    // SPECIALITY
    // ----------------------------
    if (spec) {
      const specEl = document.createElement('p');
      specEl.className = 'eds-mp-spec-item--spec';
      specEl.textContent = spec;
      li.appendChild(specEl);
    }

    // ----------------------------
    // PROFILE BUTTON
    // ----------------------------
    if (profile) {
      const wrap = document.createElement('p');
      wrap.className = 'button-container';
      profile.textContent = 'Ver perfil';

      wrap.appendChild(profile);
      li.appendChild(wrap);
    }

    newList.appendChild(li);
  });

  wrapper.appendChild(newList);

  // ----------------------------
  // FINAL RENDER
  // ----------------------------
  block.textContent = '';
  block.appendChild(wrapper);
}

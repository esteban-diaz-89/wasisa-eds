export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const title = inner.querySelector('h2');
  const specList = inner.querySelector(':scope > ul');

  if (!specList) return;

  const specs = [...specList.children];

  // ----------------------------
  // WRAPPER
  // ----------------------------

  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-user';

  // TITLE
  if (title) {
    title.className = 'eds-mp-user__subtitle';
    wrapper.appendChild(title);
  }

  const content = document.createElement('div');
  content.className = 'eds-mp-user__content';

  // ----------------------------
  // LOOP ESPECIALIDADES
  // ----------------------------

  specs.forEach(spec => {
    const children = [...spec.children];

    const titleP = children.find(el => el.tagName === 'P');
    const phone = spec.querySelector('a[title="phone"]');
    const appointment = spec.querySelector('a[title="appointment"]');

    const innerLists = children.filter(el => el.tagName === 'UL');
    const doctorsList = innerLists[0];
    const subsList = innerLists[1];

    // WRAPPER CARD
    const card = document.createElement('div');
    card.className = 'eds-mp-spec-center';

    // ----------------------------
    // HEADER
    // ----------------------------

    const header = document.createElement('ul');
    header.className = 'eds-mp-spec-center__header';

    const titleLi = document.createElement('li');
    titleLi.className = 'eds-mp-spec-center__header--title';

    const h3 = document.createElement('h3');
    h3.textContent = titleP?.textContent;

    titleLi.appendChild(h3);
    header.appendChild(titleLi);

    // ACTIONS
    if (phone || appointment) {
      const actions = document.createElement('li');
      actions.className = 'eds-mp-spec-center__header--actions';

      if (phone) {
        const wrap = document.createElement('p');
        wrap.className = 'button-cmp';

        phone.className = 'btn button-cmp__text button-cmp__text--tertiary button-location';

        wrap.appendChild(phone);
        actions.appendChild(wrap);
      }

      if (appointment) {
        const wrap = document.createElement('p');
        wrap.className = 'button-cmp';

        appointment.className = 'btn button-cmp__text button-cmp__text--primary';
        appointment.textContent = 'Pedir Cita';

        wrap.appendChild(appointment);
        actions.appendChild(wrap);
      }

      header.appendChild(actions);
    }

    card.appendChild(header);

    // ----------------------------
    // DETAILS
    // ----------------------------
    if (doctorsList || subsList) {
        const details = document.createElement('details');
        details.className = 'eds-mp-spec-center__details';

        const summary = document.createElement('summary');
        summary.textContent = 'Ver más información';

        details.appendChild(summary);

        const detailsList = document.createElement('ul');
        detailsList.className = 'eds-mp-spec-center__details--list';

        // DOCTORS
        if (doctorsList) {
          const item = document.createElement('li');
          item.className = 'eds-mp-spec-center__details--list-item';

          item.innerHTML = `
            <h4><i class="icon-equipo-medico"></i>Cuadro de especialistas</h4>
          `;

          const ol = document.createElement('ol');

          [...doctorsList.children].forEach(li => {
            const newLi = document.createElement('li');
            newLi.textContent = li.textContent;
            ol.appendChild(newLi);
          });

          item.appendChild(ol);
          detailsList.appendChild(item);
        }

        // SUBS
        if (subsList) {
          const item = document.createElement('li');
          item.className = 'eds-mp-spec-center__details--list-item';
          item.innerHTML = `<h4><i class="icon-hospital"></i>Subespecialidades</h4>`;
          const ol = document.createElement('ol');

          [...subsList.children].forEach(li => {
            const newLi = document.createElement('li');
            newLi.textContent = li.textContent;
            ol.appendChild(newLi);
          });

          item.appendChild(ol);
          detailsList.appendChild(item);
        }

        details.appendChild(detailsList);
    }
    card.appendChild(details);

    content.appendChild(card);
  });

  wrapper.appendChild(content);

  block.textContent = '';
  block.appendChild(wrapper);
}
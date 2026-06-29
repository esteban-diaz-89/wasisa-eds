/**
 * Bloque "cuadro-medico-otras-especialidades"
 *
 * Chips de especialidades disponibles en la provincia actual.
 * Lee la URL: /cuadro-medico/p/{provSlug}/pe/{specSlug}
 *
 * UI 100% con clases del design system ASISA (clientlib-site.min.css):
 *   - .cmp-medical-detail__subtitle           → título
 *   - .cmp-medical-detail__other-specialities → contenedor flex-wrap
 *   - .cmp-tag-template--blank / --blue       → chip
 */

export default function decorate(block) {

  // 1. Añadir clase al wrapper interno que ya existe
  const inner = block.querySelector(':scope > div > div');
  const h2 = inner.querySelector('h2');
  const ul = inner.querySelector('ul');

  // Crear el div wrapper sin tocar h2 ni ul
  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-other-specs';

  // Mover h2 y ul al wrapper (no los recrea, los mueve)
  h2.classList.add('eds-mp-other-specs__title');
  ul.classList.add('eds-mp-other-specs__container');

  // Decorar cada li/a sin reemplazarlos
  ul.querySelectorAll('li').forEach(li => {
    const a = li.querySelector('a');
    if (!a) return;
    a.classList.add('cmp-tag-template', 'cmp-tag-template--blue-100');

    // Envolver el texto en span sin perder el nodo de texto
    const span = document.createElement('span');
    span.className = 'cmp-tag-template__text';
    span.textContent = a.textContent;
    a.textContent = '';
    a.appendChild(span);
  });

  // Reorganizar el DOM: mover h2 y ul al wrapper
  inner.appendChild(wrapper);
  wrapper.appendChild(h2);
  wrapper.appendChild(ul);
}
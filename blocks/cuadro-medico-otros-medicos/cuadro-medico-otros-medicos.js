/**
 * Bloque "cuadro-medico-otros-medicos".
 *
 * Pinta DOS grupos de chips de otros médicos:
 *   1) Otros médicos de <especialidad> en <provincia>
 *   2) Otros médicos de <especialidad> en <centro>  (si el doctor tiene parentDescription)
 *
 * Lee la URL:  /cuadro-medico/d/{key}
 *
 * UI 100% con clases del design system ASISA:
 *   - .cmp-medical-detail__subtitle           → título de cada grupo
 *   - .cmp-medical-detail__other-specialities → contenedor flex-wrap de chips
 *   - .cmp-tag-template--blank                → chip
 */

export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');

  const h2 = inner.querySelector('h2');
  const h3s = [...inner.querySelectorAll('h3')];

  // Construir las cards a partir de cada h3 + su p siguiente,
  // sin destruir los nodos — los movemos al nuevo DOM
  const cards = h3s.map((h3) => {
    const p = h3.nextElementSibling;
    const a = h3.querySelector('a');

    const article = document.createElement('article');
    article.className = 'cm-fcentro__doctor-card';

    const nameEl = document.createElement('h3');
    nameEl.className = 'cm-fcentro__doctor-name';

    if (a) {
      // Reutilizar el <a> existente, solo añadir clase si fuera necesario
      nameEl.appendChild(a);
    } else {
      nameEl.textContent = h3.textContent;
    }

    article.appendChild(nameEl);

    if (p) {
      p.className = 'cm-fcentro__doctor-spec';
      article.appendChild(p);
    }

    return article;
  });

  // Construir la nueva estructura sin innerHTML
  const section = document.createElement('section');

  h2.className = 'cmp-medical-detail__subtitle';
  section.appendChild(h2);

  const container = document.createElement('div');
  container.className = 'cmp-medical-detail__other-specialities';
  cards.forEach((card) => container.appendChild(card));
  section.appendChild(container);

  // Vaciar inner y montar la estructura final
  inner.innerHTML = '';
  inner.appendChild(section);
}

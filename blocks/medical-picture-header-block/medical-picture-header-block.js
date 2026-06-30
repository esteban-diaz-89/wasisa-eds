export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const h1 = inner.querySelector('h1');
  const ps = inner.querySelectorAll('p');
  const pretitle = ps[0];
  const p = ps[1];

  // Aplicar clases directamente
  if (pretitle) pretitle.classList.add('eds-mp-box-head--pretitle');
  if (h1) h1.classList.add('eds-mp-box-head--title');
  if (p) p.classList.add('eds-mp-box-head--text');


  // Crear wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'eds-mp-box-head';

  // Insertar wrapper antes del contenido
  inner.appendChild(wrapper);

  // Mover nodos dentro
  if (pretitle) wrapper.appendChild(pretitle);
  if (h1) wrapper.appendChild(h1);
  if (p) wrapper.appendChild(p);
}
export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const ol = inner.querySelector('ol');
  if (!ol) return;

  const lis = [...ol.querySelectorAll('li')];

  ol.classList.add('cmp-breadcrumb__list');

  const nav = document.createElement('nav');
  nav.className = 'cmp-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.setAttribute('role', 'navigation');

  lis.forEach((li, i) => {
    const isLast = i === lis.length - 1;
    const a = li.querySelector('a');

    li.classList.add('cmp-breadcrumb__item');

    if (isLast) {
      li.classList.add('cmp-breadcrumb__item--active');
      li.setAttribute('aria-current', 'page');

      if (!a) {
        const span = document.createElement('span');
        span.className = 'cmp-breadcrumb__item-link';
        span.textContent = li.textContent;

        li.textContent = '';
        li.appendChild(span);
      }
    } else if (a) {
      a.classList.add('cmp-breadcrumb__item-link');
    }
  });

  inner.appendChild(nav);
  nav.appendChild(ol);
}
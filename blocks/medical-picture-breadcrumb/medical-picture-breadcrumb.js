export default function decorate(block) {
  const inner = block.querySelector(':scope > div > div');
  if (!inner) return;

  const ol = inner.querySelector('ol');
  if (!ol) return;

  const lis = [...ol.querySelectorAll('li')];

  const nav = document.createElement('nav');
  nav.className = 'cmp-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');

  const newOl = document.createElement('ol');
  newOl.className = 'cmp-breadcrumb__list';

  lis.forEach((li, i) => {
    const isLast = i === lis.length - 1;
    const a = li.querySelector('a');

    const newLi = document.createElement('li');
    newLi.className = `cmp-breadcrumb__item${isLast ? ' cmp-breadcrumb__item--active' : ''}`;

    if (isLast) {
      newLi.setAttribute('aria-current', 'page');

      const span = document.createElement('span');
      span.className = 'cmp-breadcrumb__item-link';
      span.textContent = a ? a.textContent : li.textContent;

      newLi.appendChild(span);
    } else if (a) {
      a.classList.add('cmp-breadcrumb__item-link');
      newLi.appendChild(a);
    }

    newOl.appendChild(newLi);
  });
  nav.appendChild(newOl);
  inner.appendChild(nav);
}
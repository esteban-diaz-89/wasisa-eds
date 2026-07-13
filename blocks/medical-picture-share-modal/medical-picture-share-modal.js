const SHARE_URLS = {
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  x: (url) => `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`,
  whatsapp: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  email: (url) => `mailto:?body=${encodeURIComponent(url)}`,
};

function buildModal() {
  const wrapper = document.createElement('div');
  wrapper.className = 'cmp-modal';
  wrapper.hidden = true;
  wrapper.setAttribute('role', 'dialog');
  wrapper.setAttribute('aria-modal', 'true');

  wrapper.innerHTML = `
    <div class="cmp-modal__container">
      <div class="cmp-modal__header">
        <div class="cmp-modal__header--close">
          <i class="icon-close-02"></i>
        </div>
      </div>
      <div class="cmp-modal__body">
        <ul class="eds-share__container">
          <li class="eds-share__container--icon">
            <i class="icon-equipo-medico"></i>
          </li>
          <li class="eds-share__container--title">
            <h2>Vas a compartir <span class="shared-modal__name"></span></h2>
          </li>
          <li>
            <p>Selecciona una de las opciones:</p>
          </li>
          <li class="eds-share__container--links">
            <a href="#" data-share="facebook"><i class="icon-facebook"></i></a>
            <a href="#" data-share="linkedin"><i class="icon-linkedin-blanco"></i></a>
            <a href="#" data-share="x"><i class="icon-x-twitter"></i></a>
            <a href="#" data-share="whatsapp"><i class="icon-whatsapp"></i></a>
            <a href="#" data-share="email"><i class="icon-email"></i></a>
          </li>
        </ul>
        <ol class="eds-share__button-holder">
          <li>
            <a class="button-cmp__text button-cmp__text--without js-modal-close" href="#">
              <i class="icon-arrow-left icon-large"></i> Atrás
            </a>
          </li>
        </ol>
      </div>
    </div>
  `;

  return wrapper;
}

function close(modal) {
  modal.hidden = true;
}

export default function decorate(block) {
  const modal = buildModal();
  block.appendChild(modal);

  const nameEl = modal.querySelector('.shared-modal__name');

  // Cerrar con el botón X
  modal.querySelector('.cmp-modal__header--close').addEventListener('click', () => close(modal));

  // Cerrar con "Atrás"
  modal.querySelector('.js-modal-close').addEventListener('click', (e) => {
    e.preventDefault();
    close(modal);
  });

  // Cerrar clickando fuera del container
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close(modal);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close(modal);
  });

  // Abrir modal desde cualquier bloque via evento
  document.addEventListener('modal:share', ({ detail }) => {
    nameEl.textContent = detail.name || '';
    modal.querySelectorAll('[data-share]').forEach((a) => {
      const network = a.dataset.share;
      if (SHARE_URLS[network]) a.href = SHARE_URLS[network](detail.url);
    });
    modal.hidden = false;
  });
}
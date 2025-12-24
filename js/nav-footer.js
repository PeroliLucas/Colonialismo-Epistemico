/* =====================================================
   BASE PATH — GitHub Pages ou Local
===================================================== */
const BASE_PATH = location.hostname.includes('github.io')
  ? '/Colonialismo-Epistemico'
  : '';

/* =====================================================
   FUNÇÃO PARA ATIVAR MENU MOBILE
===================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-menu');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu');
    toggle.classList.toggle('show-icon');
  });
}

/* =====================================================
   FUNÇÃO GENÉRICA PARA INJETAR COMPONENTES
===================================================== */
function loadComponent(selector, componentPath, callback) {
  const container = document.querySelector(selector);
  if (!container) return;

  fetch(`${BASE_PATH}${componentPath}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${componentPath}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;

      /* Corrige todos os data-link */
      container.querySelectorAll('[data-link]').forEach(link => {
        link.setAttribute('href', BASE_PATH + link.dataset.link);
      });

      /* Executa callback após injeção */
      if (callback) callback();
    })
    .catch(error => console.error(error));
}

/* =====================================================
   INICIALIZAÇÃO GLOBAL
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('#site-header', '/components/header.html', initMobileMenu);
  loadComponent('#site-footer', '/components/footer.html');
});

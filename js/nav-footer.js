/* =====================================================
   BASE PATH — GitHub Pages ou Local
===================================================== */
const BASE_PATH = location.hostname.includes('github.io')
  ? '/Colonialismo-Epistemico'
  : '';

/* =====================================================
   FUNÇÃO GENÉRICA PARA INJETAR HTML
===================================================== */
function loadComponent(selector, componentPath) {
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

      /* Corrige todos os data-link após injeção */
      container.querySelectorAll('[data-link]').forEach(link => {
        link.setAttribute('href', BASE_PATH + link.dataset.link);
      });
    })
    .catch(error => console.error(error));
}

/* =====================================================
   INICIALIZAÇÃO GLOBAL
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('#site-header', '/components/header.html');
  loadComponent('#site-footer', '/components/footer.html');
});

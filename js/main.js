// ================================
//           AOS INIT
// ================================
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

});

// ================================
//          PROGRESS BAR
// ================================
document.addEventListener("scroll", () => {
  const progressBar = document.getElementById("progress-bar");

  if (!progressBar) return;

  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = scrollPercent + "%";
});

  // ================================
  // TOOLTIP GLOSSÁRIO
  // ================================
  document.querySelectorAll("[data-glossario]").forEach((term) => {
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = term.getAttribute("title") || "";
    term.appendChild(tooltip);
    term.removeAttribute("title");

    term.addEventListener("click", (e) => {
      e.stopPropagation();
      term.classList.toggle("aberto");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".glossario.aberto")
      .forEach((t) => t.classList.remove("aberto"));
  });


// ================================
//   CARROSSEL DE CITAÇÕES PAG 1
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".carroussel-btn.prev");
  const nextBtn = document.querySelector(".carroussel-btn.next");

  if (!slidesContainer || slides.length === 0) return;

  let current = 0;
  const total = slides.length;
  const intervalTime = 8500;
  let autoSlide;

  const showSlide = (index) => {
    current = (index + total) % total;
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
  };

  const resetInterval = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => showSlide(current + 1), intervalTime);
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(current - 1);
      resetInterval();
    });
    nextBtn.addEventListener("click", () => {
      showSlide(current + 1);
      resetInterval();
    });
  }

  autoSlide = setInterval(() => showSlide(current + 1), intervalTime);

  showSlide(current);
});


  // ================================
  // CHART.JS INIT PAG 1
  // ================================
  const vermelhoVinho = getComputedStyle(document.documentElement)
    .getPropertyValue("--vermelho-vinho")
    .trim();
  const cinzaClaro = getComputedStyle(document.documentElement)
    .getPropertyValue("--cinza-claro")
    .trim();
  const verdePalestina = getComputedStyle(document.documentElement)
    .getPropertyValue("--verde-palestina")
    .trim();

  fetch("data/dados.json")
    .then((response) => response.json())
    .then((dados) => {
      new Chart(document.getElementById("chart1"), {
        type: "doughnut",
        data: {
          labels: ["Estereotipados", "Não estereotipados"],
          datasets: [
            {
              data: dados.chart1,
              backgroundColor: [vermelhoVinho, cinzaClaro],
            },
          ],
        },
        options: { responsive: true },
      });

      new Chart(document.getElementById("chart2"), {
        type: "line",
        data: {
          labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Estudos sobre colonialismo epistêmico",
              data: dados.chart2,
              backgroundColor: verdePalestina,
            },
          ],
        },
        options: { responsive: true },
      });

      new Chart(document.getElementById("chart3"), {
        type: "pie",
        data: {
          labels: ["Distorção Midiática", "Representação Correta"],
          datasets: [
            {
              data: dados.chart3,
              backgroundColor: [vermelhoVinho, cinzaClaro],
            },
          ],
        },
        options: { responsive: true },
      });
    })
    .catch((err) => console.error("Erro ao carregar os dados do JSON:", err));


// ================================
  // TIMELINE PAG2
  // ================================
    function toggleContext(button) {
    const contexto = button.nextElementSibling;
    if (contexto.style.maxHeight && contexto.style.maxHeight !== "0px") {
      contexto.style.maxHeight = "0";
    } else {
      contexto.style.maxHeight = contexto.scrollHeight + "px";
    }
  }

  // ================================
  // ACCORDION PAG2
  // ================================
 const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;

    // Fecha outros itens
    document.querySelectorAll('.accordion-item').forEach(i => {
      if (i !== item) {
        i.classList.remove('active');
      }
    });

    // Alterna o item clicado
    item.classList.toggle('active');
  });
});

// ================================
  // TAB/ABA PAG2
  // ================================
const tabButtons = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".cards-container .card");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove classe active de todas as tabs
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    cards.forEach(card => {
      if(filter === "todos") {
        card.style.display = "block";
      } else {
        card.style.display = card.classList.contains(filter) ? "block" : "none";
      }
    });
  });
});

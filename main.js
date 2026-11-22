// Menu burger (mobile)
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Année automatique dans le pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Compteurs animés (chiffres clés)
const counters = document.querySelectorAll('.count');

function animate(el) {
  const target = +el.dataset.target;
  const step = Math.max(1, Math.ceil(target / 60));
  let value = 0;
  const timer = setInterval(() => {
    value = Math.min(value + step, target);
    el.textContent = value + '+';
    if (value >= target) clearInterval(timer);
  }, 25);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));

const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll <= 0) {
    header.classList.add('hidden');
    return;
  }

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scrolling down
    header.classList.add('hidden');
  } else {
    // Scrolling up
    header.classList.remove('hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// IntersectionObserver para animação reveal
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach(el => observer.observe(el));

// Tema claro/escuro automático
const themeToggle = document.getElementById('themeToggle');

function setThemeByTime() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 19) {
    document.body.classList.add('light');
    themeToggle.textContent = '🌞';
  } else {
    document.body.classList.remove('light');
    themeToggle.textContent = '🌙';
  }
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    themeToggle.textContent = '🌞';
  } else {
    themeToggle.textContent = '🌙';
  }
});

setThemeByTime();

/* ProjexaAI Landing — interactions */
(function () {
  // Footer year
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('topnav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  // Subtle parallax on the mockup
  const mockup = document.querySelector('.mockup');
  if (mockup && window.matchMedia('(min-width: 960px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      mockup.style.transform = `perspective(1500px) rotateY(${-4 + x}deg) rotateX(${2 - y}deg)`;
    });
  }
})();

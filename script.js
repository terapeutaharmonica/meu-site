document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menuBtn');
const mobilePanel = document.getElementById('mobilePanel');

menuBtn.addEventListener('click', () => {
  const isOpen = mobilePanel.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mobilePanel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Botão Pix: copia a chave para a área de transferência
const pixBtn = document.getElementById('pixBtn');
const PIX_KEY = 'andressa.sdcs@gmail.com';
if (pixBtn) {
  pixBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      pixBtn.textContent = 'Chave Pix copiada!';
    } catch {
      pixBtn.textContent = `Chave Pix: ${PIX_KEY}`;
    }
    setTimeout(() => { pixBtn.textContent = 'Pagar com Pix'; }, 3000);
  });
}

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

// Botão Pix: como ainda não há chave configurada, orienta pelo WhatsApp
const pixBtn = document.getElementById('pixBtn');
if (pixBtn) {
  pixBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Chave Pix ainda não configurada. Por enquanto, combine o pagamento pelo WhatsApp.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const successText = document.getElementById('successText');
  const choiceBox = document.getElementById('choiceBox');
  const confettiLayer = document.getElementById('confettiLayer');

  const createConfetti = () => {
    if (!confettiLayer) return;

    const colors = ['#111111', '#d8b4a0', '#f6d365', '#fda4af', '#c4b5fd', '#86efac', '#fbbf24', '#a7f3d0'];

    for (let i = 0; i < 180; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = '50%';
      piece.style.top = '50%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 900}px`);
      piece.style.setProperty('--dy', `${(Math.random() - 0.5) * 900}px`);
      piece.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      piece.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
      confettiLayer.appendChild(piece);

      setTimeout(() => piece.remove(), 3500);
    }
  };

  if (yesBtn && noBtn && successText && choiceBox) {
    const moveNoButton = () => {
      const maxX = Math.max(0, choiceBox.clientWidth - noBtn.offsetWidth - 24);
      const maxY = Math.max(0, choiceBox.clientHeight - noBtn.offsetHeight - 24);
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;
    };

    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('mousemove', (event) => {
      const rect = noBtn.getBoundingClientRect();
      if (
        event.clientX >= rect.left - 35 &&
        event.clientX <= rect.right + 35 &&
        event.clientY >= rect.top - 35 &&
        event.clientY <= rect.bottom + 35
      ) {
        moveNoButton();
      }
    });

    noBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      moveNoButton();
    });

    yesBtn.addEventListener('click', () => {
      createConfetti();
      successText.textContent = 'Merci… je savais que tu me pardonnerais 🥹';
      yesBtn.textContent = 'Oui❤️';
      yesBtn.disabled = true;
      noBtn.style.display = 'none';
    });

    moveNoButton();
  }
});

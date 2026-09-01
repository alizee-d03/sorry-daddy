document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const successText = document.getElementById('successText');
  const choiceBox = document.getElementById('choiceBox');

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
      successText.textContent = 'Oui… je savais que tu me pardonnerais 😌';
      yesBtn.textContent = 'Oui, toujours ❤️';
      yesBtn.disabled = true;
      noBtn.style.display = 'none';
    });

    moveNoButton();
  }
});

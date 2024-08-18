const block = document.getElementById('block');
const hole = document.getElementById('hole');
const character = document.getElementById('character');
const score = document.getElementById('score');

let jumping = 0;
let scoreCount = 0;

hole.addEventListener('animationiteration', () => {
  score.innerHTML = scoreCount;
  const random = -(Math.random() * 300 + 150);
  hole.style.top = random + 'px';
  scoreCount++;
});

setInterval(() => {
  const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));

  if (jumping == 0) {
    character.style.top = characterTop + 3 + 'px';
  }

  const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'));
  const cTop = -(500 - characterTop);

  if (
    characterTop > 480 ||
    (blockLeft < 20 && blockLeft > -50 && (cTop < holeTop || cTop > holeTop + 130))
  ) {
    alert('Game Over.');
    character.style.top = 100 + 'px';
    scoreCount = 0;
    score.innerHTML = 0;
  }
}, 10);

const jump = () => {
  jumping = 1;
  let jumpCount = 0;

  const jumpInterval = setInterval(() => {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));

    if (characterTop > 6 && jumpCount < 15) {
      character.style.top = characterTop - 5 + 'px';
    }

    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }

    jumpCount++;
  }, 10);
};

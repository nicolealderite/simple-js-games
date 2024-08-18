const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreValue = document.getElementById('scoreValue');

let isJumping = false;
let isGameOver = false;
let counter = 0;
let scoreStarted = false;

// Add event listeners for both spacebar and click
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !isJumping && !isGameOver) {
    startGame(); // Start the game when the player jumps
    jump();
  }
});

document.addEventListener('click', () => {
  if (!isJumping && !isGameOver) {
    startGame(); // Start the game when the player jumps
    jump();
  }
});

function jump() {
  isJumping = true;
  dino.classList.add('jump');
  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 500); // Same as jump animation duration
}

// Function to start the game and score
function startGame() {
  if (!scoreStarted) {
    scoreStarted = true;
    counter = 0; // Reset the counter at the start
    scoreValue.textContent = counter;

    // Start counting score only after the first jump
    const checkCollision = setInterval(() => {
      if (isGameOver) return; // Stop the game if it's over

      const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
      const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

      const cactusWidth = 20; // Adjust to the visible cactus width
      const dinoHeightThreshold = 40; // Adjust dino's jump threshold

      // Check collision more precisely (using tighter boundaries)
      if (cactusLeft > 50 && cactusLeft < 100 && dinoBottom <= dinoHeightThreshold) {
        alert(`Game Over! Final Score: ${Math.floor(counter / 26)}`);
        isGameOver = true; // Stop the game after collision
        cactus.style.animation = 'none'; // Stop the cactus movement
        scoreStarted = false; // Reset scoreStarted to allow restarting the game
        clearInterval(checkCollision); // Stop the interval after game over
      }

      // Increment score only if cactus passes the dino successfully
      if (cactusLeft < 50 && !isGameOver) {
        counter++;
        scoreValue.textContent = Math.floor(counter / 26); // Update score when cactus passes the dino
      }
    }, 10);
  }
}

// Restart the game on click after game over
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && isGameOver) {
    resetGame();
  }
});

document.addEventListener('click', () => {
  if (isGameOver) {
    resetGame();
  }
});

function resetGame() {
  isGameOver = false;
  counter = 0;
  scoreValue.textContent = 0;
  cactus.style.animation = 'moveCactus 2s infinite linear'; // Restart cactus animation
  scoreStarted = false; // Allow the score to start again when the player jumps
}

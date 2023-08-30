const car = document.querySelector('.car');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.querySelector('.score');
const gameContainer = document.querySelector('.game-container');

let score = 0; // Initialize the score
let gameRunning = true; // Keep track of the game state

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    moveCarLeft();
  } else if (event.key === 'ArrowRight') {
    moveCarRight();
  }
});

function moveCarLeft() {
  const carLeft = parseFloat(getComputedStyle(car).left);
  if (carLeft > 0) {
    car.style.left = (carLeft - 10) + 'px';
  }
}

function moveCarRight() {
  const carLeft = parseFloat(getComputedStyle(car).left);
  const gameContainerWidth = parseFloat(getComputedStyle(car.parentElement).width);
  const carWidth = parseFloat(getComputedStyle(car).width);

  if (carLeft + carWidth < gameContainerWidth) {
    car.style.left = (carLeft + 10) + 'px';
  }
}

function moveObstacle() {
  const obstacleTop = parseFloat(getComputedStyle(obstacle).top);

  if (obstacleTop > gameContainerHeight) {
    obstacle.style.top = '-40px'; // Reset obstacle position when it's out of the container
    obstacle.style.left = Math.random() * (gameContainerWidth - obstacleWidth) + 'px'; // Move obstacle to a random horizontal position
    increaseScore(); // Increase the score when an obstacle is avoided
  } else {
    obstacle.style.top = (obstacleTop + 5) + 'px'; // Move obstacle downward
    checkCollision(); // Check for collision with the car
  }
}

function increaseScore() {
  if (gameRunning) {
    score += 10; // Increase the score by 10
    scoreDisplay.textContent = 'Score: ' + score; // Update the score display
  }
}

function gameOver() {
  gameRunning = false; // Stop the game
  gameContainer.style.background = 'black'; // Set background to black
  gameContainer.innerHTML = '<div class="game-over">Game Over</div>'; // Display "Game Over" message
  
}

function checkCollision() {
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    carRect.top < obstacleRect.bottom &&
    carRect.bottom > obstacleRect.top &&
    carRect.left < obstacleRect.right &&
    carRect.right > obstacleRect.left
  ) {
    gameOver(); // Car and obstacle collided
  }
}

const obstacleWidth = parseFloat(getComputedStyle(obstacle).width);
const gameContainerWidth = parseFloat(getComputedStyle(obstacle.parentElement).width);
const gameContainerHeight = parseFloat(getComputedStyle(obstacle.parentElement).height);

setInterval(moveObstacle, 50);

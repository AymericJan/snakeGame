// Base code inspired from Kenny Yip Coding: https://www.youtube.com/watch?v=baBq5GAL0_U

//board variables
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

//dir
var currentDirection;
var nextDirection;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); // runs the update function every 100ms
  update();
};

function update() {
  document.getElementById("score").innerHTML = snakeBody.length;
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // Let the body follow the head
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "orange";
  updateVelocity();
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  context.fillStyle = "lime";
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize - 1 ||
    snakeY < 0 ||
    snakeY > rows * blockSize - 1
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && currentDirection != "down") {
    nextDirection = "up";
  } else if (e.code == "ArrowDown" && currentDirection != "up") {
    nextDirection = "down";
  } else if (e.code == "ArrowLeft" && currentDirection != "right") {
    nextDirection = "left";
  } else if (e.code == "ArrowRight" && currentDirection != "left") {
    nextDirection = "right";
  }
}

function updateVelocity() {
  if (nextDirection == "up") {
    velocityX = 0;
    velocityY = -1;
  } else if (nextDirection == "down") {
    velocityX = 0;
    velocityY = 1;
  } else if (nextDirection == "left") {
    velocityX = -1;
    velocityY = 0;
  } else if (nextDirection == "right") {
    velocityX = 1;
    velocityY = 0;
  }
  currentDirection = nextDirection;
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
  while (checkFoodNotOnSnake() == false) {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
  }
}

function checkFoodNotOnSnake() {
  for (let i = 0; i < snakeBody.length; i++) {
    if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
      isFoodOk = false;
      console.log("wrong");
      return false;
    }
  }
  return true;
}

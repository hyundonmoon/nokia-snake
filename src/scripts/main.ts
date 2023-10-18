import { update, draw } from "./game.js";
import { outsideGrid } from "./utils.js";
import { ateItself, getSnakeHead, resetSnake } from "./snake.js";
import { resetFood } from "./food.js";
import { updateDirection, resetDirection } from "./input.js";

const initialScreen = document.querySelector(".initial-screen");
const gameScreen = document.querySelector(".game-screen");
const inputMenu = document.querySelector(".input-menu");
const speedInput = document.querySelector("#speed-input");
const gameStartBtn = document.querySelector(".game-start-btn");
const gameboard = document.querySelector("#gameboard");
const scoreboard = document.querySelector("#scoreboard");

let gameOver = false;
let prevTimeStamp = 0;
let requestAnimationFrameId;
let score = [];
let gameSpeed;

inputMenu.addEventListener("submit", (e) => {
  e.preventDefault();
  startGame();
});

function startGame() {
  const gameSpeedInput = parseInt(speedInput.value);

  if (
    typeof gameSpeedInput === "number" &&
    gameSpeedInput >= 10 &&
    gameSpeedInput <= 20
  ) {
    gameSpeed = gameSpeedInput;
  } else {
    gameSpeed = 15;
  }

  initialScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  window.addEventListener("keydown", updateDirection);

  requestAnimationFrameId = window.requestAnimationFrame(gameLoop);
}

function resetGame() {
  initialScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  gameboard.innerHTML = "";
  gameSpeed = null;
  gameOver = false;
  score = [];
  resetSnake();
  resetFood();
  resetDirection();
  window.removeEventListener("keydown", updateDirection);
  window.cancelAnimationFrame(requestAnimationFrameId);
}

function gameLoop(timeStamp) {
  if (gameOver) {
    alert(`Your final score is: ${score.length}`);
    return resetGame();
  }

  window.requestAnimationFrame(gameLoop);

  const elapsedTime = (timeStamp - prevTimeStamp) / 1000;
  if (elapsedTime < 1 / gameSpeed) return;

  // only runs if enough time has elapsed
  prevTimeStamp = timeStamp;
  update(score);
  updateScore();
  draw(gameboard);
  checkDeath();
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || ateItself();
}

function updateScore() {
  scoreboard.innerHTML = `Score: ${score.length}`;
}

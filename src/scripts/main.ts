import { update, draw } from "./game.js";
import { outsideGrid } from "./utils.js";
import { ateItself, getSnakeHead, resetSnake } from "./snake.js";
import { debouncedUpdateFoodSize, resetFood } from "./food.js";
import { updateDirection, resetDirection } from "./input.js";
import { Mode } from "../types.js";

const initialScreen: HTMLDivElement =
  document.querySelector(".initial-screen")!;
const gameScreen: HTMLDivElement = document.querySelector(".game-screen")!;
const gameMenuFormElement: HTMLFormElement =
  document.querySelector(".game-menu")!;
const gameboard: HTMLDivElement = document.querySelector("#gameboard")!;
const scoreboard: HTMLDivElement = document.querySelector("#scoreboard")!;
const gameOverScreen: HTMLDivElement =
  document.querySelector(".gameover-screen")!;
const goBackToMainMenuButton: HTMLButtonElement =
  document.querySelector(".main-menu-button")!;
const playAgainButton: HTMLButtonElement =
  document.querySelector(".play-again-button")!;

let gameOver = false;
let prevTimeStamp = 0;
let requestAnimationFrameId: number;
let score: string[] = [];
let gameSpeed: number;
let gameMode: Mode;

gameMenuFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(gameMenuFormElement);
  const speed = formData.get("speed") as string;
  const mode = formData.get("mode") as Mode;
  initialScreen.classList.add("hidden");
  startGame(parseInt(speed, 10), mode);
});

function startGame(speed: number, mode: Mode) {
  gameSpeed = speed;
  gameMode = mode;

  gameScreen.classList.toggle("hidden");

  window.addEventListener("keydown", updateDirection);
  window.addEventListener("resize", debouncedUpdateFoodSize);

  requestAnimationFrameId = window.requestAnimationFrame((timestamp) =>
    gameLoop(timestamp, mode),
  );
}

function resetGame() {
  gameOver = false;
  score = [];

  resetSnake();
  resetFood();
  resetDirection();

  window.removeEventListener("keydown", updateDirection);
  window.removeEventListener("resize", debouncedUpdateFoodSize);
  window.cancelAnimationFrame(requestAnimationFrameId);
}

function showGameOverScreen(mode: Mode, score: string[] = []) {
  const speedInfoElement: HTMLParagraphElement = gameOverScreen.querySelector(
    ".selected-speed > .game-detail-info",
  )!;
  const difficultyInfoElement: HTMLParagraphElement =
    gameOverScreen.querySelector(".selected-difficulty > .game-detail-info")!;
  const applesEatenInfoElement: HTMLParagraphElement =
    gameOverScreen.querySelector(".apples-eaten > .game-detail-info")!;

  if (gameSpeed === 10) {
    speedInfoElement.innerText = "Easy";
  } else if (gameSpeed === 15) {
    speedInfoElement.innerText = "Medium";
  } else if (gameSpeed === 20) {
    speedInfoElement.innerText = "Difficult";
  }

  if (mode === "easy") {
    difficultyInfoElement.innerText = "Easy";
  } else if (mode === "difficult") {
    difficultyInfoElement.innerText = "Difficult";
  }

  applesEatenInfoElement.innerText = (score.length ?? 0).toString();

  goBackToMainMenuButton.addEventListener("click", goBackToMainMenu);
  playAgainButton.addEventListener("click", playAgain);

  gameboard.replaceChildren();
  gameScreen.classList.toggle("hidden");
  gameOverScreen.classList.toggle("hidden");
}

function hideGameOverScreen() {
  const speedInfoElement: HTMLParagraphElement = gameOverScreen.querySelector(
    ".selected-speed > .game-detail-info",
  )!;
  const difficultyInfoElement: HTMLParagraphElement =
    gameOverScreen.querySelector(".selected-difficulty > .game-detail-info")!;
  const applesEatenInfoElement: HTMLParagraphElement =
    gameOverScreen.querySelector(".apples-eaten > .game-detail-info")!;

  speedInfoElement.innerText = "";
  difficultyInfoElement.innerText = "";
  applesEatenInfoElement.innerText = "";

  goBackToMainMenuButton.removeEventListener("click", goBackToMainMenu);
  playAgainButton.removeEventListener("click", playAgain);

  gameOverScreen.classList.toggle("hidden");
}

function goBackToMainMenu() {
  hideGameOverScreen();
  initialScreen.classList.remove("hidden");
}

function playAgain() {
  hideGameOverScreen();
  initialScreen.classList.add("hidden");
  startGame(gameSpeed, gameMode);
}

function gameLoop(timeStamp: number, mode: Mode) {
  if (gameOver) {
    showGameOverScreen(mode, score);
    resetGame();
    return;
  }

  requestAnimationFrameId = window.requestAnimationFrame(
    (newTimeStamp: number) => gameLoop(newTimeStamp, mode),
  );

  const elapsedTime = (timeStamp - prevTimeStamp) / 1000;
  if (elapsedTime < 1 / gameSpeed) return;

  // only runs if enough time has elapsed
  prevTimeStamp = timeStamp;
  update(score, mode);
  updateScore();
  draw(gameboard);
  checkDeath();
}

function checkDeath() {
  if (gameMode === "easy") {
    gameOver = ateItself();
  } else if (gameMode === "difficult") {
    gameOver = outsideGrid(getSnakeHead()) || ateItself();
  }
}

function updateScore() {
  scoreboard.innerHTML = `Score: ${score.length}`;
}

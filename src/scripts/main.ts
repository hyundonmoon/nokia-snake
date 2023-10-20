import { update, draw } from "./game.js";
import { outsideGrid } from "./utils.js";
import { ateItself, getSnakeHead, resetSnake } from "./snake.js";
import { resetFood, updateFoodSize } from "./food.js";
import { updateDirection, resetDirection } from "./input.js";
import { Mode } from "../types.js";

const initialScreen: HTMLDivElement =
  document.querySelector(".initial-screen")!;
const gameScreen: HTMLDivElement = document.querySelector(".game-screen")!;
const gameMenuFormElement: HTMLFormElement =
  document.querySelector(".game-menu")!;
const gameboard: HTMLDivElement = document.querySelector("#gameboard")!;
const scoreboard: HTMLDivElement = document.querySelector("#scoreboard")!;

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
  startGame(parseInt(speed, 10), mode);
});

function startGame(speed: number, mode: Mode) {
  gameSpeed = speed;
  gameMode = mode;

  initialScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  window.addEventListener("keydown", updateDirection);
  window.addEventListener("resize", updateFoodSize);

  requestAnimationFrameId = window.requestAnimationFrame((timestamp) =>
    gameLoop(timestamp, mode),
  );
}

function resetGame() {
  initialScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  gameboard.replaceChildren();
  gameSpeed = 0;
  gameOver = false;
  score = [];

  resetSnake();
  resetFood();
  resetDirection();

  window.removeEventListener("keydown", updateDirection);
  window.removeEventListener("resize", updateFoodSize);
  window.cancelAnimationFrame(requestAnimationFrameId);
}

function gameLoop(timeStamp: number, mode: Mode) {
  if (gameOver) {
    alert(`Your final score is: ${score.length}`);
    return resetGame();
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

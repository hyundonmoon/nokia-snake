import { update, draw } from './game.js';
import { GAME_SPEED } from './settings.js';
import { outsideGrid } from './utils.js';
import { ateItself, getSnakeHead } from './snake.js';

const gameboard = document.querySelector('#gameboard');
const scoreboard = document.querySelector('#scoreboard');
let gameOver = false;
let prevTimeStamp = 0;
let score = [];

function gameLoop(timeStamp) {
  if (gameOver) {
    if (confirm(`Your final score: ${score.length}`)) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(gameLoop);
  const elapsedTime = (timeStamp - prevTimeStamp) / 1000;
  if (elapsedTime < 1 / GAME_SPEED) return;

  // only runs if enough time has elapsed
  prevTimeStamp = timeStamp;
  update(score);
  updateScore();
  draw(gameboard);
  checkDeath();
}

window.requestAnimationFrame(gameLoop);

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || ateItself();
}

function updateScore() {
  scoreboard.innerHTML = `Score: ${score.length}`;
}

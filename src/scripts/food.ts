import { overlapsSnake, getSnakeHead, extendSnake } from "./snake.js";
import { randomGridPosition, overlap } from "./utils.js";

let foodCoords = randomGridPosition();

function getRandomFoodPosition() {
  let newFoodCoords;
  while (newFoodCoords == null || overlapsSnake(newFoodCoords)) {
    newFoodCoords = randomGridPosition();
  }
  return newFoodCoords;
}

function ateFood(foodCoords) {
  return overlap(getSnakeHead(), foodCoords);
}

export function updateFood(score) {
  if (ateFood(foodCoords)) {
    score.push("score!");
    extendSnake();
    foodCoords = getRandomFoodPosition();
  }
}

export function drawFood(gameboard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = foodCoords.y;
  foodElement.style.gridColumnStart = foodCoords.x;
  foodElement.classList.add("food");
  gameboard.appendChild(foodElement);
}

export function resetFood() {
  foodCoords = getRandomFoodPosition();
}

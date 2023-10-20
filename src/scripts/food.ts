import { Coordinates } from "../types.js";
import { overlapsSnake, getSnakeHead, extendSnake } from "./snake.js";
import { randomGridPosition, overlap } from "./utils.js";

let foodCoords = randomGridPosition();

function getRandomFoodPosition(): Coordinates {
  let newFoodCoords = randomGridPosition();

  while (overlapsSnake(newFoodCoords)) {
    newFoodCoords = randomGridPosition();
  }

  return newFoodCoords;
}

function ateFood(foodCoords: Coordinates): boolean {
  return overlap(getSnakeHead(), foodCoords);
}

export function updateFood(score: string[]) {
  if (ateFood(foodCoords)) {
    score.push("score!");
    extendSnake();
    foodCoords = getRandomFoodPosition();
  }
}

export function drawFood(gameboard: HTMLDivElement) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = foodCoords.y.toString();
  foodElement.style.gridColumnStart = foodCoords.x.toString();
  foodElement.classList.add("food");
  foodElement.innerText = "🍎";

  const columnWidth = Math.floor(gameboard.clientWidth / 21);
  foodElement.style.fontSize = `${
    Number.isNaN(columnWidth) ? 16 : columnWidth
  }px`;
  foodElement.style.lineHeight = `${
    Number.isNaN(columnWidth) ? 16 : columnWidth
  }px`;

  gameboard.appendChild(foodElement);
}

export function resetFood() {
  foodCoords = getRandomFoodPosition();
}

export function updateFoodSize() {
  const gameboard = document.querySelector("#gameboard") as HTMLDivElement;
  const foodElement = document.querySelector(".food") as HTMLDivElement;

  if (!gameboard || !foodElement) {
    return;
  }

  const columnWidth = Math.floor(gameboard.clientWidth / 21);
  foodElement.style.fontSize = `${
    Number.isNaN(columnWidth) ? 16 : columnWidth
  }px`;
  foodElement.style.lineHeight = `${
    Number.isNaN(columnWidth) ? 16 : columnWidth
  }px`;
}

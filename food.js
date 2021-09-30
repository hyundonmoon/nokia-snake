import { overlapsSnake, getSnakeHead, extendSnake } from './snake.js';
import { randomGridPosition, overlap } from './utils.js';
import { extendSnakeBy } from './settings.js';

let foodCoords = randomGridPosition();

const getRandomFoodPosition = () => {
  let newFoodPosition;
  while (newFoodPosition == null || overlapsSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
};

function ateFood(foodCoords) {
  return overlap(getSnakeHead(), foodCoords);
}

export function updateFood(score) {
  if (ateFood(foodCoords)) {
    score.push('score!');
    extendSnake(extendSnakeBy);
    foodCoords = getRandomFoodPosition();
  }
}

export function drawFood(gameboard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = foodCoords.y;
  foodElement.style.gridColumnStart = foodCoords.x;
  foodElement.classList.add('food');
  gameboard.appendChild(foodElement);
}

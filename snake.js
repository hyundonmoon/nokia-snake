import { getNextDirection } from './input.js';
import { overlap } from './utils.js';

// array of objects containing coordinates for each snake body part
// first object is the head
export const SNAKE = [{ x: 11, y: 11 }];

// return coordinates for the snake head
export function getSnakeHead() {
  return SNAKE[0];
}

// adds new parts to the end of the SNAKE array
// the new parts will appear one by one as the snake moves
export function extendSnake(num) {
  for (let i = 0; i < num; i++) {
    SNAKE.push({ ...SNAKE[SNAKE.length - 1] });
  }
}

// checks if snake head overlaps with its body
// uses slice method to get rid of first two parts because
// 1) head can't collide with itself
// 2) head can't collide with the second part since backtracking isn't allowed
// at best it can only collide with the third part
export function ateItself() {
  return SNAKE.slice(2).some((part) => overlap(part, SNAKE[0]));
}

// checks if coordinates overlap with any part of snake
// used to prevent new food from appearing on top of a snake part
export function overlapsSnake(coords) {
  return SNAKE.some((part) => overlap(part, coords));
}

export function drawSnake(gameboard) {
  // without line 39, previous snake parts will stil be there at the next render
  // (i.e., the snake won't move, it'll just get longer)
  gameboard.innerHTML = '';
  SNAKE.forEach((part) => {
    const partElement = document.createElement('div');
    partElement.style.gridRowStart = part.y;
    partElement.style.gridColumnStart = part.x;
    partElement.classList.add('snake');
    gameboard.appendChild(partElement);
  });
}

// all parts, except for the head, will take the place of its previous part
export function updateSnake() {
  for (let i = SNAKE.length - 2; i >= 0; i--) {
    SNAKE[i + 1] = { ...SNAKE[i] };
  }

  SNAKE[0].x += getNextDirection().x;
  SNAKE[0].y += getNextDirection().y;
}

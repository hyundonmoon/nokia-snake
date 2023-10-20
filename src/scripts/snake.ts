import { Coordinates, Mode } from "../types.js";
import { getNextDirection } from "./input.js";
import { GRID_SIZE, overlap } from "./utils.js";

let SNAKE: Coordinates[] = [{ x: 11, y: 11 }];

export function getSnakeHead(): Coordinates {
  return SNAKE[0];
}

export function extendSnake() {
  SNAKE.push({ ...SNAKE[SNAKE.length - 1] });
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

export function drawSnake(gameboard: HTMLDivElement) {
  gameboard.replaceChildren();
  SNAKE.forEach((part) => {
    const partElement = document.createElement("div");
    partElement.style.gridRowStart = part.y.toString();
    partElement.style.gridColumnStart = part.x.toString();
    partElement.classList.add("snake");
    gameboard.appendChild(partElement);
  });
}

// all parts, except for the head, will take the place of its previous part
export function updateSnake(mode: Mode) {
  SNAKE = [
    getNewSnakeHeadCoordinates(SNAKE[0], mode),
    ...SNAKE.slice(0, SNAKE.length - 1),
  ];
}

function getNewSnakeHeadCoordinates(
  currentHead: Coordinates,
  mode: Mode,
): Coordinates {
  let newSnakeHeadXCoordinate = currentHead.x + getNextDirection().x;
  let newSnakeHeadYCoordinate = currentHead.y + getNextDirection().y;

  if (mode === "difficult") {
    return { x: newSnakeHeadXCoordinate, y: newSnakeHeadYCoordinate };
  }

  if (newSnakeHeadXCoordinate < 1) {
    newSnakeHeadXCoordinate = GRID_SIZE;
  } else if (newSnakeHeadXCoordinate > GRID_SIZE) {
    newSnakeHeadXCoordinate = 1;
  }

  if (newSnakeHeadYCoordinate < 1) {
    newSnakeHeadYCoordinate = GRID_SIZE;
  } else if (newSnakeHeadYCoordinate > GRID_SIZE) {
    newSnakeHeadYCoordinate = 1;
  }

  return { x: newSnakeHeadXCoordinate, y: newSnakeHeadYCoordinate };
}

export function resetSnake() {
  SNAKE = [{ x: 11, y: 11 }];
}

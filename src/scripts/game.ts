import { updateSnake, drawSnake } from "./snake.js";
import { updateFood, drawFood } from "./food.js";

export function update(score: string[]) {
  updateSnake();
  updateFood(score);
}

export function draw(gameboard: HTMLDivElement) {
  drawSnake(gameboard);
  drawFood(gameboard);
}

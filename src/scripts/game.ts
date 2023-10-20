import { updateSnake, drawSnake } from "./snake.js";
import { updateFood, drawFood } from "./food.js";
import { Mode } from "../types.js";

export function update(score: string[], mode: Mode) {
  updateSnake(mode);
  updateFood(score);
}

export function draw(gameboard: HTMLDivElement) {
  drawSnake(gameboard);
  drawFood(gameboard);
}

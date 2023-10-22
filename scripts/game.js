import { updateSnake, drawSnake } from "./snake.js";
import { updateFood, drawFood } from "./food.js";
export function update(score, mode) {
    updateSnake(mode);
    updateFood(score);
}
export function draw(gameboard) {
    drawSnake(gameboard);
    drawFood(gameboard);
}

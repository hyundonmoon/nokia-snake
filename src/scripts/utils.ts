import { Coordinates } from "../types";

export const GRID_SIZE = 21;

export function randomGridPosition(): Coordinates {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

export function outsideGrid(position): boolean {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}

// check if two coordinates overlap
export function overlap(c1: Coordinates, c2: Coordinates): boolean {
  return c1.x === c2.x && c1.y === c2.y;
}

// returns a debounced function
export function debounce(
  fn: (...args: unknown[]) => void,
  delay = 200,
): (...args: unknown[]) => void {
  let timerId: number | null = null;

  return (...args: unknown[]) => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }

    timerId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

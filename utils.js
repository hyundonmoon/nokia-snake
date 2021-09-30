import { GRID_SIZE } from './settings.js';

export const randomGridPosition = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
};

export const outsideGrid = (position) => {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
};

// check if two coordinates overlap
export const overlap = (c1, c2) => {
  return c1.x === c2.x && c1.y === c2.y;
};

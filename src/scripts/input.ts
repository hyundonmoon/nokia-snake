import { Coordinates, Direction } from "../types";

let nextDirection: Coordinates = { x: 0, y: 0 };

export function updateDirection(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp": {
      if (nextDirection.y !== 0) return;
      nextDirection = { x: 0, y: -1 };
      break;
    }
    case "ArrowDown": {
      if (nextDirection.y !== 0) return;
      nextDirection = { x: 0, y: 1 };
      break;
    }
    case "ArrowLeft": {
      if (nextDirection.x !== 0) return;
      nextDirection = { x: -1, y: 0 };
      break;
    }
    case "ArrowRight": {
      if (nextDirection.x !== 0) return;
      nextDirection = { x: 1, y: 0 };
      break;
    }
    default: {
      break;
    }
  }
}

export function getNextDirectionAsCoordinates(): Coordinates {
  return nextDirection;
}

export function getNextDirectionAsString(): Direction {
  if (nextDirection.x === 0 && nextDirection.y === -1) {
    return "up";
  }

  if (nextDirection.x === 0 && nextDirection.y === 1) {
    return "down";
  }

  if (nextDirection.x === -1 && nextDirection.y === 0) {
    return "left";
  }

  if (nextDirection.x === 1 && nextDirection.y === 0) {
    return "right";
  }

  return "up";
}

export function resetDirection() {
  nextDirection = { x: 0, y: 0 };
}

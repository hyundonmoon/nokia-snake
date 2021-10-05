let nextDirection = { x: 0, y: 0 };

export function updateDirection(e) {
  switch (e.key) {
    case 'ArrowUp': {
      if (nextDirection.y !== 0) return;
      nextDirection = { x: 0, y: -1 };
      break;
    }
    case 'ArrowDown': {
      if (nextDirection.y !== 0) return;
      nextDirection = { x: 0, y: 1 };
      break;
    }
    case 'ArrowLeft': {
      if (nextDirection.x !== 0) return;
      nextDirection = { x: -1, y: 0 };
      break;
    }
    case 'ArrowRight': {
      if (nextDirection.x !== 0) return;
      nextDirection = { x: 1, y: 0 };
      break;
    }
    default: {
      break;
    }
  }
}

export function getNextDirection() {
  return nextDirection;
}

export function resetDirection() {
  nextDirection = { x: 0, y: 0 };
}

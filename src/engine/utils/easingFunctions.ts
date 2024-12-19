type EasingFunction = (x: number) => number;

/**
 *  Functions for changing the speed of a motion as it progresses
 *  x represents the progress of the animation as a value from 0 to 1
 *  source: https://easings.net/
 */
const EASE = {
  linear(x: number): number {
    return x;
  },

  easeInCubic(x: number): number {
    return x * x * x;
  },

  easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  },

  easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}

export {
  EasingFunction,
  EASE
}
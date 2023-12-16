interface Math {
  /**
   * Clamp a value between a minimum and maximum.
   *
   * @param {number} value - The value to clamp.
   * @param {number} min - The minimum value.
   * @param {number} max - The maximum value.
   * @return {number} The clamped value.
   */
  clamp(value: number, min: number, max: number): number;
  degToRad(degrees: number): number;
  clamp01(value: number);
  radToDeg(radians: number): number;

  lerp(a: number, b: number, t: number): number;
  fib(value: number): number;
  normalize(value: number, min: number, max: number): number;
}

(Math as any).degToRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180.0;
};

(Math as any).radToDeg = (radians: number): number => {
  return (radians * 180.0) / Math.PI;
};

(Math as any).clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Clamp a value between 0 and 1.
 *
 * @param {number} value - The value to be clamped.
 * @return {number} The clamped value.
 */
(Math as any).clamp01 = (value) => {
  return Math.clamp(value, 0, 1);
};

/**
 * Computes the linear interpolation between two numbers.
 *
 * @param {number} a - The starting value.
 * @param {number} b - The ending value.
 * @param {number} t - The interpolation amount (between 0 and 1).
 * @returns {number} The interpolated value between a and b.
 */
(Math as any).lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

(Math as any).normalize = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};

/**
 * Calculates the Fibonacci value for a given number.
 *
 * @param {number} value - The number for which to calculate the Fibonacci value.
 * @return {number} The Fibonacci value for the given number.
 */
(Math as any).fib = (value: number): number => {
  if (value <= 1) return 1;
  return Math.fib(value - 1) + Math.fib(value - 2);
};

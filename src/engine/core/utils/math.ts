namespace TSE {
  export class CatsMath {
    /**
     * Clamp a value between a minimum and maximum.
     *
     * @param {number} value - The value to clamp.
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @return {number} The clamped value.
     */
    static Clamp(value: number, min: number, max: number): number {
      return Math.min(Math.max(value, min), max);
    }

    /**
     * Clamp a value between 0 and 1.
     *
     * @param {number} value - The value to be clamped.
     * @return {number} The clamped value.
     */
    static Clamp01(value: number): number {
      return CatsMath.Clamp(value, 0, 1);
    }

    /**
     * Computes the linear interpolation between two numbers.
     *
     * @param {number} a - The starting value.
     * @param {number} b - The ending value.
     * @param {number} t - The interpolation amount (between 0 and 1).
     * @returns {number} The interpolated value between a and b.
     */
    static Lerp(a: number, b: number, t: number): number {
      return a + (b - a) * t;
    }

    /**
     * Calculates the linear interpolation between two numbers in the range of 0 to 1.
     *
     * @param {number} a - The starting value.
     * @param {number} b - The ending value.
     * @param {number} t - The interpolation factor.
     * @return {number} The interpolated value.
     */
    static Lerp01(a: number, b: number, t: number): number {
      return CatsMath.Lerp(a, b, CatsMath.Clamp01(t));
    }

    static Normalize(value: number, min: number, max: number): number {
      return (value - min) / (max - min);
    }

    /**
     * Calculates the Fibonacci value for a given number.
     *
     * @param {number} value - The number for which to calculate the Fibonacci value.
     * @return {number} The Fibonacci value for the given number.
     */
    static fib(value: number): number {
      if (value <= 1) return 1;
      return CatsMath.fib(value - 1) + CatsMath.fib(value - 2);
    }

    /**
     * Returns the absolute value of a number.
     *
     * @param value - The number to get the absolute value of.
     * @returns The absolute value of the input number.
     */
    static abs(value: number): number {
      return Math.abs(value);
    }

    static acos(value: number): number {
      return Math.acos(value);
    }

    static asin(value: number): number {
      return Math.asin(value);
    }

    static atan(value: number): number {
      return Math.atan(value);
    }

    static atan2(y: number, x: number): number {
      return Math.atan2(y, x);
    }

    static ceil(value: number): number {
      return Math.ceil(value);
    }

    static cos(value: number): number {
      return Math.cos(value);
    }

    static exp(value: number): number {
      return Math.exp(value);
    }

    static floor(value: number): number {
      return Math.floor(value);
    }

    static log(value: number): number {
      return Math.log(value);
    }

    static log10(value: number): number {
      return Math.log10(value);
    }

    static max(a: number, b: number): number {
      return Math.max(a, b);
    }

    static min(a: number, b: number): number {
      return Math.min(a, b);
    }

    static pow(base: number, exponent: number): number {
      return Math.pow(base, exponent);
    }

    static random(): number {
      return Math.random();
    }

    static round(value: number): number {
      return Math.round(value);
    }

    static sin(value: number): number {
      return Math.sin(value);
    }

    static sqrt(value: number): number {
      return Math.sqrt(value);
    }

    static tan(value: number): number {
      return Math.tan(value);
    }

    static trunc(value: number): number {
      return Math.trunc(value);
    }
  }
}

/**
 * Sum implementations for problem 4.
 * Provide 3 unique implementations of the following function in TypeScript
 */

/**
 * Sum numbers from 1 to n using an iterative loop.
 *
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param n - positive integer (n >= 1)
 * @returns the sum 1 + 2 + ... + n
 * @throws {TypeError} if `n` is not a finite integer
 * @throws {RangeError} if `n < 1` or the result would exceed Number.MAX_SAFE_INTEGER
 */
export function sum_to_n_a(n: number): number {
  if (typeof n !== 'number' || !Number.isFinite(n) || !Number.isInteger(n)) {
    throw new TypeError('n must be a finite integer');
  }
  if (n < 1) {
    throw new RangeError('n must be >= 1');
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  if (sum > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('result exceeds Number.MAX_SAFE_INTEGER');
  }

  return sum;
}

/**
 * Sum numbers from 1 to n using the arithmetic series formula.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * Formula: n * (n + 1) / 2
 *
 * @param n - positive integer (n >= 1)
 * @returns the sum 1 + 2 + ... + n
 * @throws {TypeError} if `n` is not a finite integer
 * @throws {RangeError} if `n < 1` or the result would exceed Number.MAX_SAFE_INTEGER
 */
export function sum_to_n_b(n: number): number {
  if (typeof n !== 'number' || !Number.isFinite(n) || !Number.isInteger(n)) {
    throw new TypeError('n must be a finite integer');
  }
  if (n < 1) {
    throw new RangeError('n must be >= 1');
  }

  const result = (n * (n + 1)) / 2;

  if (result > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('result exceeds Number.MAX_SAFE_INTEGER');
  }

  return result;
}

/**
 * Sum numbers from 1 to n using recursion (simple accumulator).
 *
 * Time complexity: O(n)
 * Space complexity: O(n) due to call stack (not tail-call optimized in most JS engines)
 *
 * @param n - positive integer (n >= 1)
 * @returns the sum 1 + 2 + ... + n
 * @throws {TypeError} if `n` is not a finite integer
 * @throws {RangeError} if `n < 1` or the result would exceed Number.MAX_SAFE_INTEGER
 */
export function sum_to_n_c(n: number): number {
  if (typeof n !== 'number' || !Number.isFinite(n) || !Number.isInteger(n)) {
    throw new TypeError('n must be a finite integer');
  }
  if (n < 1) {
    throw new RangeError('n must be >= 1');
  }

  function helper(i: number, acc: number): number {
    if (i > n) return acc;
    return helper(i + 1, acc + i);
  }

  const sum = helper(1, 0);

  if (sum > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('result exceeds Number.MAX_SAFE_INTEGER');
  }

  return sum;
}

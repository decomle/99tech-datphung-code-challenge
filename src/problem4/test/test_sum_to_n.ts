import test from 'node:test';
import assert from 'node:assert/strict';
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from '../src/sum_to_n';

test('basic sums', () => {
  assert.equal(sum_to_n_a(1), 1);
  assert.equal(sum_to_n_b(1), 1);
  assert.equal(sum_to_n_c(1), 1);

  assert.equal(sum_to_n_a(2), 3);
  assert.equal(sum_to_n_b(2), 3);
  assert.equal(sum_to_n_c(2), 3);

  assert.equal(sum_to_n_a(10), 55);
  assert.equal(sum_to_n_b(10), 55);
  assert.equal(sum_to_n_c(10), 55);

  assert.equal(sum_to_n_a(1000), (1000 * 1001) / 2);
  assert.equal(sum_to_n_b(1000), (1000 * 1001) / 2);
  assert.equal(sum_to_n_c(1000), (1000 * 1001) / 2);
});

test('validation errors', () => {
  assert.throws(() => sum_to_n_a(0), RangeError);
  assert.throws(() => sum_to_n_b(0), RangeError);
  assert.throws(() => sum_to_n_c(0), RangeError);

  assert.throws(() => sum_to_n_a(1.5), TypeError);
  assert.throws(() => sum_to_n_b(NaN), TypeError);
  assert.throws(() => sum_to_n_c(Infinity), TypeError);
});

test('overflow detection', () => {
  const bigN = 900000000; // n*(n+1)/2 will exceed Number.MAX_SAFE_INTEGER
  assert.throws(() => sum_to_n_b(bigN), RangeError);
});

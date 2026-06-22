# Problem 4 — Sum 1..n


## Introduction

This folder is a self-contained project for Problem 4 
- The 3 solutions are in the script `src/problem4/src/sum_to_n.ts`
- The unit tests are created under `src/problem4/test/test_sum_to_n.ts`


## Test

To run the tests:

1. Change to the problem directory:

```bash
cd src/problem4
```

2. Install dev dependencies:

```bash
npm install
```

3. Run tests:

```bash
npm test
```

The tests use `ts-node` in transpile-only mode with Node's native test runner, so the test file can import the `.ts` source directly.

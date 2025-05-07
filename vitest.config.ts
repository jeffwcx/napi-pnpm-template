import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'forks',
    testTimeout: 2 * 60 * 1000,
  },
});

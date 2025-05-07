import { expect, it } from 'vitest';

import { plus100 } from '../index';

it('sync function from native code', () => {
  const fixture = 42;
  expect(plus100(fixture)).toBe(fixture + 100);
});

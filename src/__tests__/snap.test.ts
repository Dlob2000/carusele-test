import { describe, it, expect } from 'vitest';
import { snap } from '../utils/konvaHelpers';

describe('snap', () => {
  it('snaps to step', () => {
    expect(snap(5.2, 1)).toBe(5);
    expect(snap(5.6, 1)).toBe(6);
  });
});

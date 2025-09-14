import { describe, it, expect } from 'vitest';
import { supportsWebShare, isIOSSafari } from '../utils/mobile';

describe('mobile utils', () => {
  it('detects web share', () => {
    (globalThis as any).navigator = { share: () => {}, platform: '', userAgent: '' };
    expect(supportsWebShare()).toBe(true);
  });
  it('detects iOS safari', () => {
    (globalThis as any).navigator = { platform: 'iPhone', userAgent: 'Safari' } as any;
    expect(isIOSSafari()).toBe(true);
  });
});

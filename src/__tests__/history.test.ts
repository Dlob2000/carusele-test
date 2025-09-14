import { describe, it, expect } from 'vitest';
import { createHistory, push, undo, redo } from '../store/history';

describe('history', () => {
  it('undo/redo works', () => {
    let h = createHistory<number>(0);
    h = push(h, 1);
    h = push(h, 2);
    h = undo(h);
    expect(h.present).toBe(1);
    h = redo(h);
    expect(h.present).toBe(2);
  });
});

import { describe, it, expect } from 'vitest';
import { getExportDimensions } from '../utils/exportSize';
import { Project } from '../store/schema';

describe('export', () => {
  it('returns correct dimensions', () => {
    const project: Project = {
      id: 'p',
      name: 'test',
      size: { width: 1080, height: 1080 },
      slides: [],
      createdAt: 0,
      updatedAt: 0,
      version: 1,
    };
    expect(getExportDimensions(project)).toEqual({ width: 1080, height: 1080 });
  });
});

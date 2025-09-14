import { describe, it, expect } from 'vitest';
import { useCarouselStore } from '../store/useCarouselStore';

describe('text import', () => {
  it('creates slides per paragraph', () => {
    const text = 'Slide one\n\nSlide two';
    const importText = useCarouselStore.getState().importText;
    importText(text);
    const slides = useCarouselStore.getState().project.slides;
    expect(slides.length).toBe(2);
    expect(slides[0].layers[0].type).toBe('text');
    expect((slides[0].layers[0] as any).text).toBe('Slide one');
  });
});

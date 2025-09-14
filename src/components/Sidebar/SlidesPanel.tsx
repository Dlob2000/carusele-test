import React from 'react';
import { useCarouselStore } from '../../store/useCarouselStore';
import SlideThumb from '../Thumbs/SlideThumb';

const SlidesPanel: React.FC = () => {
  const project = useCarouselStore((s) => s.project);
  const current = useCarouselStore((s) => s.currentSlide);
  const setCurrentSlide = useCarouselStore((s) => s.setCurrentSlide);
  const deleteSlide = useCarouselStore((s) => s.deleteSlide);
  const duplicateSlide = useCarouselStore((s) => s.duplicateSlide);

  return (
    <aside className="hidden w-40 overflow-y-auto border-r bg-white md:block">
      {project.slides.map((slide, idx) => (
        <div key={slide.id} className="relative m-2">
          <button
            className={`block w-full border ${idx === current ? 'border-accent' : 'border-transparent'}`}
            onClick={() => setCurrentSlide(idx)}
          >
            <SlideThumb slide={slide} size={80} />
          </button>
          <div className="absolute right-1 top-1 flex gap-1">
            <button className="rounded bg-white/70 px-1" onClick={() => duplicateSlide(idx)} aria-label="Duplicate">
              📄
            </button>
            <button className="rounded bg-white/70 px-1" onClick={() => deleteSlide(idx)} aria-label="Delete">
              ❌
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default SlidesPanel;

import React from 'react';
import { useCarouselStore } from '../../store/useCarouselStore';
import { exportSlidePNG, exportAllSlidesZip } from '../../utils/render';

interface Props {
  onClose: () => void;
}

const ExportModal: React.FC<Props> = ({ onClose }) => {
  const project = useCarouselStore((s) => s.project);
  const current = useCarouselStore((s) => s.currentSlide);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Export</h2>
        <div className="flex flex-col gap-2">
          <button
            className="rounded bg-accent px-3 py-1 text-white"
            onClick={() => exportSlidePNG(project, current)}
          >
            Export Current Slide
          </button>
          <button
            className="rounded bg-gray-200 px-3 py-1"
            onClick={() => exportAllSlidesZip(project)}
          >
            Export All Slides (ZIP)
          </button>
        </div>
        <div className="mt-2 flex justify-end">
          <button className="px-3 py-1" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;

import React, { useState } from 'react';
import { useCarouselStore } from '../../store/useCarouselStore';
import ImportTextModal from '../Modals/ImportTextModal';
import ExportModal from '../Modals/ExportModal';

const TopBar: React.FC = () => {
  const addSlide = useCarouselStore((s) => s.addSlide);
  const undo = useCarouselStore((s) => s.undo);
  const redo = useCarouselStore((s) => s.redo);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <header className="hidden h-12 items-center justify-between bg-white px-4 shadow md:flex">
      <div className="flex gap-2">
        <button className="rounded bg-accent px-3 py-1 text-white" onClick={addSlide} aria-label="Add slide">
          + Slide
        </button>
        <button className="rounded bg-gray-200 px-3 py-1" onClick={() => setImportOpen(true)}>
          Import Text
        </button>
        <button className="rounded bg-gray-200 px-3 py-1" onClick={() => setExportOpen(true)}>
          Export
        </button>
      </div>
      <div className="flex gap-2">
        <button className="rounded bg-gray-200 px-3 py-1" onClick={undo} aria-label="Undo">
          Undo
        </button>
        <button className="rounded bg-gray-200 px-3 py-1" onClick={redo} aria-label="Redo">
          Redo
        </button>
      </div>
      {importOpen && <ImportTextModal onClose={() => setImportOpen(false)} />}
      {exportOpen && <ExportModal onClose={() => setExportOpen(false)} />}
    </header>
  );
};

export default TopBar;

import React, { useState } from 'react';
import { useCarouselStore } from '../../store/useCarouselStore';
import ImportTextModal from '../Modals/ImportTextModal';
import ExportModal from '../Modals/ExportModal';

const BottomBar: React.FC = () => {
  const addSlide = useCarouselStore((s) => s.addSlide);
  const undo = useCarouselStore((s) => s.undo);
  const redo = useCarouselStore((s) => s.redo);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex h-14 items-center justify-around bg-white shadow md:hidden">
      <button className="p-2" onClick={addSlide} aria-label="Add slide">
        ➕
      </button>
      <button className="p-2" onClick={() => setImportOpen(true)} aria-label="Import text">
        📝
      </button>
      <button className="p-2" onClick={() => setExportOpen(true)} aria-label="Export">
        ⬇️
      </button>
      <button className="p-2" onClick={undo} aria-label="Undo">
        ↩️
      </button>
      <button className="p-2" onClick={redo} aria-label="Redo">
        ↪️
      </button>
      {importOpen && <ImportTextModal onClose={() => setImportOpen(false)} />}
      {exportOpen && <ExportModal onClose={() => setExportOpen(false)} />}
    </div>
  );
};

export default BottomBar;

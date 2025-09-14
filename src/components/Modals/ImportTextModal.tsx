import React, { useState } from 'react';
import { useCarouselStore } from '../../store/useCarouselStore';

interface Props {
  onClose: () => void;
}

const ImportTextModal: React.FC<Props> = ({ onClose }) => {
  const [value, setValue] = useState('');
  const importText = useCarouselStore((s) => s.importText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Import Text</h2>
        <textarea
          className="h-40 w-full rounded border p-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-2 flex justify-end gap-2">
          <button className="px-3 py-1" onClick={onClose}>
            Cancel
          </button>
          <button
            className="rounded bg-accent px-3 py-1 text-white"
            onClick={() => {
              importText(value);
              onClose();
            }}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportTextModal;

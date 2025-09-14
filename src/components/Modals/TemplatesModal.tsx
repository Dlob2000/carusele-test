import React from 'react';

const TemplatesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Templates</h2>
        <p className="text-sm">Preset templates would appear here.</p>
        <div className="mt-2 flex justify-end">
          <button className="px-3 py-1" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesModal;

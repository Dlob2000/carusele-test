import React from 'react';

const GestureHints: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 flex items-center justify-center text-center text-sm text-gray-700 opacity-50">
    <p>Pinch to zoom, drag with two fingers to pan.</p>
  </div>
);

export default GestureHints;

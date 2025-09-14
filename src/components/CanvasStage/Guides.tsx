import React from 'react';
import { Line } from 'react-konva';

const Guides: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const centerX = width / 2;
  const centerY = height / 2;
  return (
    <>
      <Line points={[centerX, 0, centerX, height]} stroke="rgba(0,0,0,0.1)" dash={[4, 4]} />
      <Line points={[0, centerY, width, centerY]} stroke="rgba(0,0,0,0.1)" dash={[4, 4]} />
    </>
  );
};

export default Guides;

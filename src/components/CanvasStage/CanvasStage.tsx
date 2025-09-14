import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { useCarouselStore } from '../../store/useCarouselStore';
import { Layer as LayerT, TextLayer, ImageLayer } from '../../store/schema';
import Guides from './Guides';

const RenderLayer: React.FC<{ layer: LayerT }> = ({ layer }) => {
  switch (layer.type) {
    case 'text':
      const t = layer as TextLayer;
      return (
        <Text
          text={t.text}
          x={t.x - t.width / 2}
          y={t.y - t.fontSize / 2}
          width={t.width}
          align={t.align as any}
          fontFamily={t.fontFamily}
          fontSize={t.fontSize}
          fill={t.fill}
        />
      );
    case 'image':
      const imgL = layer as ImageLayer;
      const [img] = useImage(imgL.src);
      return <KonvaImage image={img} x={imgL.x} y={imgL.y} width={imgL.width} height={imgL.height} />;
    default:
      return null;
  }
};

const CanvasStage: React.FC = () => {
  const project = useCarouselStore((s) => s.project);
  const current = useCarouselStore((s) => s.currentSlide);
  const slide = project.slides[current];
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const stageRef = useRef<any>(null);

  const onWheel = (e: any) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const scaleBy = 1.02;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    setScale(newScale);
    setPosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center overflow-hidden">
      <Stage
        width={project.size.width}
        height={project.size.height}
        draggable
        onWheel={onWheel}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        ref={stageRef}
        className="touch-action-none bg-white shadow-lg"
      >
        <Layer>
          <Rect width={project.size.width} height={project.size.height} fill={slide.background.value} />
          {slide.layers.map((l) => (
            <RenderLayer key={l.id} layer={l} />
          ))}
          <Guides width={project.size.width} height={project.size.height} />
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasStage;

import React from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { Slide, Layer as LayerT, TextLayer, ImageLayer } from '../../store/schema';

interface Props {
  slide: Slide;
  size: number;
}

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

const SlideThumb: React.FC<Props> = ({ slide, size }) => {
  return (
    <Stage width={size} height={size} scaleX={size / 1080} scaleY={size / 1080} className="bg-white">
      <Layer>
        {slide.layers.map((l) => (
          <RenderLayer key={l.id} layer={l} />
        ))}
      </Layer>
    </Stage>
  );
};

export default SlideThumb;

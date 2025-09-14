import Konva from 'konva';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Project, Slide, Layer as LayerT, TextLayer, ImageLayer } from '../store/schema';

export function createStage(slide: Slide, size: { width: number; height: number }) {
  const stage = new Konva.Stage({ width: size.width, height: size.height, container: document.createElement('div') });
  const layer = new Konva.Layer();
  stage.add(layer);
  layer.add(new Konva.Rect({ width: size.width, height: size.height, fill: slide.background.value }));
  slide.layers.forEach((l) => {
    if (l.type === 'text') {
      const t = l as TextLayer;
      layer.add(
        new Konva.Text({
          text: t.text,
          x: t.x - t.width / 2,
          y: t.y - t.fontSize / 2,
          width: t.width,
          align: t.align,
          fontFamily: t.fontFamily,
          fontSize: t.fontSize,
          fill: t.fill,
        })
      );
    } else if (l.type === 'image') {
      const imgL = l as ImageLayer;
      const img = document.createElement('img');
      img.src = imgL.src;
      layer.add(new Konva.Image({ image: img, x: imgL.x, y: imgL.y, width: imgL.width, height: imgL.height }));
    }
  });
  return stage;
}

export async function exportSlidePNG(project: Project, index: number) {
  const slide = project.slides[index];
  const stage = createStage(slide, project.size);
  const url = stage.toDataURL({ pixelRatio: 2 });
  const a = document.createElement('a');
  a.href = url;
  a.download = `slide-${String(index + 1).padStart(2, '0')}.png`;
  a.click();
  stage.destroy();
}

export async function exportAllSlidesZip(project: Project) {
  const zip = new JSZip();
  project.slides.forEach((slide, i) => {
    const stage = createStage(slide, project.size);
    const url = stage.toDataURL({ pixelRatio: 2 });
    const base64 = url.split(',')[1];
    zip.file(`slide-${String(i + 1).padStart(2, '0')}.png`, base64, { base64: true });
    stage.destroy();
  });
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'slides.zip');
}

export function getExportDimensions(project: Project) {
  return project.size;
}

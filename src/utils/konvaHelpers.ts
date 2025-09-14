import Konva from 'konva';

export function snap(value: number, step = 1) {
  return Math.round(value / step) * step;
}

export function constrain(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function enableDrag(node: Konva.Node) {
  node.draggable(true);
}

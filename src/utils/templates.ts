import { Slide } from '../store/schema';

export interface Template {
  id: string;
  name: string;
  apply(slide: Slide): Slide;
}

export const templates: Template[] = [
  {
    id: 'title-center',
    name: 'Centered Title',
    apply: (slide) => {
      if (!slide.layers[0] || slide.layers[0].type !== 'text') return slide;
      const t = slide.layers[0];
      t.x = 540;
      t.y = 540;
      return slide;
    },
  },
  {
    id: 'title-top',
    name: 'Top Title',
    apply: (slide) => {
      if (!slide.layers[0] || slide.layers[0].type !== 'text') return slide;
      const t = slide.layers[0];
      t.x = 540;
      t.y = 200;
      return slide;
    },
  },
  {
    id: 'title-bottom',
    name: 'Bottom Title',
    apply: (slide) => {
      if (!slide.layers[0] || slide.layers[0].type !== 'text') return slide;
      const t = slide.layers[0];
      t.x = 540;
      t.y = 900;
      return slide;
    },
  },
  {
    id: 'left',
    name: 'Left Align',
    apply: (slide) => {
      slide.layers.forEach((l) => {
        l.x = 200;
        if (l.type === 'text') l.align = 'left';
      });
      return slide;
    },
  },
  {
    id: 'right',
    name: 'Right Align',
    apply: (slide) => {
      slide.layers.forEach((l) => {
        l.x = 880;
        if (l.type === 'text') l.align = 'right';
      });
      return slide;
    },
  },
  {
    id: 'image-bg',
    name: 'Image Background',
    apply: (slide) => slide,
  },
];

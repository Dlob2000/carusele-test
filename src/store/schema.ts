import { z } from 'zod';

export const shadowSchema = z.object({
  color: z.string(),
  blur: z.number().nonnegative(),
  offsetX: z.number(),
  offsetY: z.number(),
});

export const baseLayerSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'image']),
  x: z.number(),
  y: z.number(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  rotation: z.number(),
  opacity: z.number().min(0).max(1).default(1),
  locked: z.boolean().default(false),
  hidden: z.boolean().default(false),
  zIndex: z.number().int(),
});

export const textLayerSchema = baseLayerSchema.extend({
  type: z.literal('text'),
  text: z.string(),
  fontFamily: z.string(),
  fontSize: z.number(),
  fontWeight: z.union([z.string(), z.number()]),
  fontStyle: z.enum(['normal', 'italic']).optional(),
  lineHeight: z.number(),
  letterSpacing: z.number(),
  align: z.enum(['left', 'center', 'right']),
  fill: z.string(),
  shadow: shadowSchema.optional(),
  stroke: z
    .object({ color: z.string(), width: z.number(), align: z.enum(['center', 'outside']).optional() })
    .optional(),
  padding: z.number().default(0),
  background: z
    .object({
      enabled: z.boolean(),
      fill: z.string(),
      cornerRadius: z.number().default(0),
      opacity: z.number().min(0).max(1),
    })
    .optional(),
});

export const imageLayerSchema = baseLayerSchema.extend({
  type: z.literal('image'),
  src: z.string(),
  fit: z.enum(['contain', 'cover']),
  cornerRadius: z.number().default(0),
  shadow: shadowSchema.optional(),
  overlay: z
    .object({ enabled: z.boolean(), color: z.string(), opacity: z.number().min(0).max(1) })
    .optional(),
});

export const layerSchema = z.union([textLayerSchema, imageLayerSchema]);

export const slideSchema = z.object({
  id: z.string(),
  background: z.object({
    type: z.enum(['color', 'gradient', 'image']),
    value: z.string(),
    gradient: z.string().optional(),
  }),
  layers: z.array(layerSchema),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.object({ width: z.number(), height: z.number() }),
  slides: z.array(slideSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
  version: z.number(),
});

export type Project = z.infer<typeof projectSchema>;
export type Slide = z.infer<typeof slideSchema>;
export type Layer = z.infer<typeof layerSchema>;
export type TextLayer = z.infer<typeof textLayerSchema>;
export type ImageLayer = z.infer<typeof imageLayerSchema>;

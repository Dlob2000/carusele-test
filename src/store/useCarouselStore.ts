import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import {
  projectSchema,
  type Project,
  type Slide,
  type TextLayer,
  type Layer,
} from './schema';
import { createHistory, push, undo as undoHist, redo as redoHist } from './history';

const DEFAULT_SIZE = { width: 1080, height: 1080 };

function emptySlide(): Slide {
  return {
    id: nanoid(),
    background: { type: 'color', value: '#ffffff' },
    layers: [],
  };
}

export interface CarouselState {
  project: Project;
  history: ReturnType<typeof createHistory<Project>>;
  currentSlide: number;
  setCurrentSlide(index: number): void;
  addSlide(): void;
  duplicateSlide(index: number): void;
  deleteSlide(index: number): void;
  setProject(p: Project): void;
  importText(text: string): void;
  undo(): void;
  redo(): void;
  loadFromStorage(): void;
}

export const useCarouselStore = create<CarouselState>()(
  persist(
    (set, get) => ({
      project: {
        id: nanoid(),
        name: 'Untitled',
        size: DEFAULT_SIZE,
        slides: [emptySlide()],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
      history: createHistory<Project>({
        id: '',
        name: '',
        size: DEFAULT_SIZE,
        slides: [],
        createdAt: 0,
        updatedAt: 0,
        version: 1,
      }),
      currentSlide: 0,
      setCurrentSlide: (index) => set({ currentSlide: index }),
      addSlide: () =>
        set((state) => {
          const slide = emptySlide();
          const project = {
            ...state.project,
            slides: [...state.project.slides, slide],
            updatedAt: Date.now(),
          };
          return { project, history: push(state.history, project), currentSlide: project.slides.length - 1 };
        }),
      duplicateSlide: (index) =>
        set((state) => {
          const slide = JSON.parse(JSON.stringify(state.project.slides[index]));
          slide.id = nanoid();
          const slides = [...state.project.slides];
          slides.splice(index + 1, 0, slide);
          const project = { ...state.project, slides, updatedAt: Date.now() };
          return { project, history: push(state.history, project), currentSlide: index + 1 };
        }),
      deleteSlide: (index) =>
        set((state) => {
          const slides = state.project.slides.filter((_, i) => i !== index);
          const project = { ...state.project, slides, updatedAt: Date.now() };
          return { project, history: push(state.history, project), currentSlide: Math.max(0, index - 1) };
        }),
      setProject: (p) => set({ project: p, history: push(get().history, p) }),
      importText: (text) =>
        set((state) => {
          const paragraphs = text
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean);
          const slides = paragraphs.map((p) => ({
            id: nanoid(),
            background: { type: 'color', value: '#ffffff' },
            layers: [
              {
                id: nanoid(),
                type: 'text',
                x: state.project.size.width / 2,
                y: state.project.size.height / 2,
                width: state.project.size.width,
                height: 0,
                rotation: 0,
                opacity: 1,
                locked: false,
                hidden: false,
                zIndex: 0,
                text: p,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 34,
                fontWeight: 600,
                lineHeight: 40,
                letterSpacing: 0,
                align: 'center',
                fill: '#000000',
                padding: 0,
              } as TextLayer,
            ],
          }));
          const project = {
            ...state.project,
            slides,
            updatedAt: Date.now(),
          };
          return { project, history: push(state.history, project), currentSlide: 0 };
        }),
      undo: () => set((state) => ({ history: undoHist(state.history), project: undoHist(state.history).present })),
      redo: () => set((state) => ({ history: redoHist(state.history), project: redoHist(state.history).present })),
      loadFromStorage: () => {
        const raw = localStorage.getItem('carousel-project');
        if (raw) {
          try {
            const proj = projectSchema.parse(JSON.parse(raw));
            set({ project: proj, history: createHistory<Project>(proj) });
          } catch (e) {
            console.error(e);
          }
        }
      },
    }),
    {
      name: 'carousel-project',
      partialize: (state) => ({ project: state.project }),
    }
  )
);

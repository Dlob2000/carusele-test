import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface Toast {
  id: string;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  add(message: string): void;
  remove(id: string): void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (message) =>
    set((state) => ({ toasts: [...state.toasts, { id: nanoid(), message }] })),
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

import { create } from "zustand";

type EditTaskModal = {
  id: string | null;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useEditTaskModal = create<EditTaskModal>((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id: string) => set({ id, isOpen: true }),
  onClose: () => set({ id: null, isOpen: false }),
}));

import { create } from "zustand";

type CreateTaskModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateTaskModal = create<CreateTaskModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

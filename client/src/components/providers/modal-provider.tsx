import { CreateTaskModal } from "@/components/modals/create-task-modal";
import { EditTaskModal } from "@/components/modals/edit-task-modal/index";

export const ModalProvider = () => {
  return (
    <>
      <CreateTaskModal />
      <EditTaskModal />
    </>
  );
};

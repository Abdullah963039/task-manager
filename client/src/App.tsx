import { TaskManager } from "@/components/task-manager";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

export default function App() {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      <TaskManager />
    </>
  );
}

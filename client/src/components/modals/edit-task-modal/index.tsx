import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditTask } from "@/hooks/use-edit-task";
import { useEditTaskModal } from "@/hooks/use-edit-task-modal";
import { useTask } from "@/hooks/use-task";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { EditTaskForm } from "./form";

export const EditTaskModal = () => {
  const { isOpen, onClose, id } = useEditTaskModal();
  const { data } = useTask(id);

  const { mutateAsync, isPending } = useEditTask(id!, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>

        {!data ? (
          <EditTaskModalSkeleton />
        ) : (
          <EditTaskForm
            data={data}
            onSubmit={mutateAsync}
            disabled={isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const EditTaskModalSkeleton = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-full h-8" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-full h-24" />
      </div>

      <div className="flex items-center gap-x-4">
        <div className="w-4 h-4 rounded ring ring-muted" />
        <div className="space-y-2 flex-1">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-4 pt-4">
        <Button variant="secondary" disabled>
          Cancel
        </Button>
        <Button disabled>Save</Button>
      </div>
    </div>
  );
};

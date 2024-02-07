import { CheckCircle, Edit, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Task as TaskT } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditTaskModal } from "@/hooks/use-edit-task-modal";

interface Props {
  task: TaskT;
  index: number;
}

export const Task = ({ task, index }: Props) => {
  const { onOpen } = useEditTaskModal();

  return (
    <div className="flex gap-x-2">
      <span
        className={cn(
          "shrink-0 basis-10 px-2 bg-primary-foreground flex items-center justify-center text-xl font-medium",
          task.completed && "bg-emerald-200 line-through"
        )}
      >
        #{index}
      </span>
      <div className="flex flex-1 items-center justify-between py-4">
        <div className="font-bold text-lg">
          <p
            className={cn(
              "flex items-center gap-x-2",
              task.completed && "line-through"
            )}
          >
            {task.title}
            {task.completed && (
              <CheckCircle className="h-3 w-3 text-emerald-500" />
            )}
          </p>
          <p className="text-muted-foreground text-sm font-normal">
            {task.description}
          </p>
        </div>
        <div className="flex items-center gap-x-2 pr-2 md:pr-4">
          <Button variant="secondary" onClick={() => onOpen(task._id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const TaskSkeleton = () => {
  return (
    <div className="flex gap-x-2">
      <span className="shrink-0 basis-16 px-2 bg-primary-foreground animate-pulse" />

      <div className="flex flex-1 grow items-center justify-between py-4">
        <div className="space-y-4">
          <Skeleton className="w-40 h-6" />

          <div className="space-y-2">
            <Skeleton className="w-96 h-5" />
            <Skeleton className="w-96 h-5" />
            <Skeleton className="w-80 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-x-2 pr-2 md:pr-4">
          <Skeleton className="w-10 h-10" />

          <Skeleton className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

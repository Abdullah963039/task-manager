import { ListTodo, Plus } from "lucide-react";

import { Navbar, NavbarSkeleton } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { TasksList, TasksListSkeleton } from "@/components/tasks-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/use-tasks";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";

export const TaskManager = () => {
  const { onOpen } = useCreateTaskModal();
  const { data, isLoading } = useTasks();

  if (isLoading || !data) return <TaskManagerLoading />;

  return (
    <>
      <Navbar />
      <main className="my-12 md:my-16">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-x-4">
            <ListTodo className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-medium">
              Tasks{" "}
              <span className="text-[0.75em] text-muted-foreground">
                ( {data!.results} )
              </span>
            </h3>
          </div>

          <Button
            className="flex items-center justify-center gap-x-1"
            onClick={() => onOpen()}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </div>
        <TasksList data={data!.data} />
      </main>
    </>
  );
};

const TaskManagerLoading = () => {
  return (
    <>
      <NavbarSkeleton />

      <main className="my-12 md:my-16">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-x-4">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-64 h-8" />
          </div>

          {/* Button */}
          <Skeleton className="w-24 h-10" />
        </div>
        <TasksListSkeleton />
      </main>
    </>
  );
};

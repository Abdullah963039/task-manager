import { Loader, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useClearTasks } from "@/hooks/use-clear-tasks";
import { Skeleton } from "./ui/skeleton";

export const Navbar = () => {
  const { mutateAsync, isPending } = useClearTasks();

  return (
    <header className="h-16 w-full border-b shadow-sm flex items-center">
      <div className="w-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Task Manager
        </h1>
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center justify-center gap-x-1"
          onClick={() => mutateAsync()}
        >
          {isPending ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Clearing</span>
            </>
          ) : (
            <>
              <Trash className="h-4 w-4" />
              <span className="hidden sm:inline">Clear tasks</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
};

export const NavbarSkeleton = () => {
  return (
    <header className="h-16 w-full border-b shadow-sm flex items-center">
      <div className="w-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        <Skeleton className="w-40 h-6" />

        <Skeleton className="w-24 h-9" />
      </div>
    </header>
  );
};

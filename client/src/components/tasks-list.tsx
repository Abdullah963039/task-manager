import { Task as TaskT } from "@/types/task";
import { Task, TaskSkeleton } from "@/components/task";

interface Props {
  data: TaskT[];
}

export const TasksList = ({ data }: Props) => {
  if (data.length === 0) return null;

  return (
    <div className="px-6 sm:px-8 md:px-10 my-12">
      <ul className="border w-full rounded shadow-sm divide-y">
        {data.map((task, idx) => (
          <Task key={task._id} task={task} index={idx + 1} />
        ))}
      </ul>
    </div>
  );
};

export const TasksListSkeleton = () => (
  <div className="px-6 sm:px-8 md:px-10 my-12">
    <ul className="border w-full rounded shadow-sm divide-y">
      {[...Array(3)].map((_, idx) => (
        <TaskSkeleton key={idx} />
      ))}
    </ul>
  </div>
);

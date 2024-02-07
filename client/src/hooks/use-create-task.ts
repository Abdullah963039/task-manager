import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { baseUrl } from "@/config/api";
import { Task } from "@/types/task";

type Data = {
  title: string;
  completed: boolean;
  description?: string | undefined;
};

const createTask = async (inputs: Data) => {
  const { data } = await baseUrl.post<Task>("/api/v1/tasks", inputs);

  return data;
};

export const useCreateTask = (onFinish: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      onFinish();
      toast.success("Task created successfuly");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: AxiosError<{ status: string; message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

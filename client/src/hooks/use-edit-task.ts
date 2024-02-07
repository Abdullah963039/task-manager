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

const updateTask = async (inputs: Data, id: string) => {
  const { data } = await baseUrl.patch<Task>(`/api/v1/tasks/${id}`, inputs);

  return data;
};

export const useEditTask = (id: string, onFinish: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inputs: Data) => updateTask(inputs, id),
    onSuccess: () => {
      onFinish();
      toast.success("Task updated successfuly");
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
    onError: (error: AxiosError<{ status: string; message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

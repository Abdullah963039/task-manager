import { useQuery } from "@tanstack/react-query";

import { baseUrl } from "@/config/api";
import { Task } from "@/types/task";

const getTaskById = async (id: string) => {
  const { data } = await baseUrl.get<{ data: Task }>(`/api/v1/tasks/${id}`);

  return data;
};

export const useTask = (id?: string | null) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id!),
    enabled: !!id,
    select: (data) => data.data,
  });
};

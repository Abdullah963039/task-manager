import { useQuery } from "@tanstack/react-query";

import { baseUrl } from "@/config/api";
import { Task } from "@/types/task";

type Response = {
  results: number;
  data: Task[];
};

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await baseUrl.get<Response>("/api/v1/tasks");

      return data;
    },
  });
};

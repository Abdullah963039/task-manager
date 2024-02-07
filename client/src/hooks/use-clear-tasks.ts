import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { baseUrl } from "@/config/api";

export const useClearTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await baseUrl.delete("/api/v1/tasks"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success("Tasks have been cleared");
    },
    onError: () => toast.error("Something went wrong"),
  });
};

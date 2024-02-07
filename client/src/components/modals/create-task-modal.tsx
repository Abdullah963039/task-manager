import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateTask } from "@/hooks/use-create-task";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Task title is required",
    })
    .min(3, "Title must be at least 3 letters"),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateTaskModal = () => {
  const { isOpen, onClose } = useCreateTaskModal();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  const { mutateAsync, isPending } = useCreateTask(onClose);

  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g Finish react course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Task description or steps"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="flex items-start flex-col leading-none">
                    <FormLabel className="cursor-pointer">
                      Is your task completed?
                    </FormLabel>
                    <FormDescription>
                      Mark as checed if your task is already completed
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-x-4 pt-4">
              <DialogClose asChild>
                <Button variant="secondary" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { createTaskSchema, updateTaskSchema } from "@/lib/schema/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTasks } from "@/lib/context/useTasks";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { useEditing } from "@/lib/context/useEditing";

type FormType = z.infer<typeof createTaskSchema>;
type FormUpdateType = z.infer<typeof updateTaskSchema>;

function CreateForm() {
  const { setTasks } = useTasks();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      disc: "",
      due: new Date().toISOString().slice(0, 16),
    },
  });

  const onSubmit = async (data: FormType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/task/create`,
        data
      );

      setTasks?.((prev) => [response.data.data, ...prev]);
      resetForm();
      toast({
        title: "Task created",
        description: "Task created successfully",
        variant: "default",
      });
    } catch (error) {
      handleError(error, "create", toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper
      control={control}
      loading={loading}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      submitText="Add Task"
      loadingText="Adding"
    />
  );
}

function UpdateForm() {
  const { setTasks, tasks } = useTasks();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { id, setEditing, setId } = useEditing();

  const task = useMemo(
    () => tasks.find((item) => item._id === id),
    [tasks, id]
  );

  const date = task?.due ? new Date(task.due).toISOString().slice(0, 16) : "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdateType>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: id || "22",
      title: task?.title || "",
      disc: task?.description || "",
      due: date,
    },
  });

  const onUpdate = async (data: FormUpdateType) => {
    console.log("clicked");
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/task/update`,
        { ...data, _id: id }
      );
      console.log(response);
      setTasks?.((prev) =>
        prev.map((item) => (item._id === id ? response.data.data : item))
      );

      toast({
        title: "Task updated",
        description: "Task updated successfully",
        variant: "default",
      });

      if (setEditing && setId) {
        setEditing(false);
        setId(null);
      }
    } catch (error) {
      handleError(error, "update", toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper
      control={control}
      loading={loading}
      handleSubmit={handleSubmit(onUpdate)}
      errors={errors}
      submitText="Update Task"
      loadingText="Updating"
      onCancel={() => {
        if (setEditing && setId) {
          setEditing(false);
          setId(null);
        }
      }}
    />
  );
}

function FormWrapper({
  loading,
  handleSubmit,
  errors,
  submitText,
  loadingText,
  onCancel,
  control,
}: {
  loading: boolean;
  handleSubmit: any;
  errors: any;
  submitText: string;
  loadingText: string;
  onCancel?: () => void;
  control: any;
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={loading}
          className="space-y-4 bg-card p-6 rounded-lg shadow-sm"
        >
          <div className="space-y-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Task title"
                  className="w-full"
                />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Controller
              name="disc"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Task description"
                  className="w-full min-h-[100px]"
                />
              )}
            />
            {errors.disc && (
              <p className="text-sm text-red-500">{errors.disc.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Controller
              name="due"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="datetime-local"
                  className="w-fit"
                  value={field.value}
                />
              )}
            />
            {errors.due && (
              <p className="text-sm text-red-500">{errors.due.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="px-6">
              {loading ? loadingText : submitText}
            </Button>
            {onCancel && (
              <Button type="reset" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
}

function handleError(error: unknown, action: "create" | "update", toast: any) {
  const message =
    error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : "Something went wrong";

  toast({
    title: `Failed to ${action} task`,
    description: message,
    variant: "destructive",
  });
}

export function TaskForm() {
  const { editing } = useEditing();
  return editing ? <UpdateForm /> : <CreateForm />;
}

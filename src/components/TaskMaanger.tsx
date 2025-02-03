"use client";

import { useTasks } from "@/lib/context/useTasks";
import { TaskForm } from "./TaskForm";
import { useEffect } from "react";
import { Tasks } from "@/lib/types/tasks";
import ListOfTasks from "./ListOfTasks";
import { EditingContextProvider } from "@/lib/context/useEditing";

interface TaskManagerProps {
  tasks: Tasks[];
}

export function TaskManager({ tasks }: TaskManagerProps) {
  const { setTasks } = useTasks();

  useEffect(() => {
    if (setTasks) setTasks(tasks);
  }, []);

  return (
    <EditingContextProvider>
      <TaskForm />
      <ListOfTasks />
    </EditingContextProvider>
  );
}

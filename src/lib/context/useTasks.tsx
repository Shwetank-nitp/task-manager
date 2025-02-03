"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Tasks } from "../types/tasks";

const initialState: {
  tasks: Tasks[];
  setTasks: Dispatch<React.SetStateAction<Tasks[]>> | undefined;
} = {
  tasks: [],
  setTasks: undefined,
};

const TaskContext = createContext(initialState);

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => useContext(TaskContext);

export { useTasks, TaskContextProvider };

import { useTasks } from "@/lib/context/useTasks";
import TaskCard from "./TaskCard";
import { Tasks } from "@/lib/types/tasks";

export default function ListOfTasks() {
  const { tasks } = useTasks();
  return (
    <div className="flex flex-col gap-2 my-6">
      {tasks.map((item: Tasks) => {
        return (
          <TaskCard
            key={item._id}
            _id={item._id}
            title={item.title}
            due={item.due}
            createdAt={item.createdAt}
            description={item.description}
            status={item.status}
          />
        );
      })}
    </div>
  );
}

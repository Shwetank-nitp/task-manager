"use client";

import { Tasks } from "@/lib/types/tasks";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "./ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditing } from "@/lib/context/useEditing";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "@/lib/context/useTasks";
import { format } from "date-fns";

interface TaskCardProps extends Tasks {}

export default function TaskCard({
  _id,
  title,
  description,
  status,
  due,
  createdAt,
}: TaskCardProps) {
  const { editing, setEditing, setId } = useEditing();
  const { setTasks } = useTasks();
  const { toast } = useToast();

  const handleEdit = () => {
    setEditing?.(true);
    setId?.(_id);
  };

  const deleteTask = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/task/delete`,
        {
          data: { taskId: _id },
        }
      );

      setTasks?.((prev) => prev.filter((item) => item._id !== _id));
      toast({
        title: "Task Deleted",
        description: "Task was successfully deleted",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Error while deleting the task, please try again later",
        variant: "destructive",
      });
    }
  };

  const handleComplete = async (e: boolean) => {
    const newStatus = e ? "completed" : "pending";

    try {
      const put = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/task/update`,
        {
          id: _id,
          status: newStatus,
        }
      );

      setTasks?.((prev) =>
        prev.map((item) => (item._id === _id ? put.data.data : item))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDue = format(new Date(due), "MMM dd, yyyy HH:mm");
  const formattedCreated = format(new Date(createdAt), "MMM dd, yyyy HH:mm");

  return (
    <motion.div
      key={_id}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-4 rounded-lg flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={status === "completed"}
            onCheckedChange={handleComplete}
            disabled={editing}
            className={cn(editing && "opacity-50 cursor-not-allowed")}
          />
          <span
            className={cn(
              "text-lg font-semibold",
              status === "completed" && "line-through text-gray-500"
            )}
          >
            {title}
          </span>
        </div>
        <div className="flex gap-2">
          {status !== "expired" && (
            <Button
              onClick={handleEdit}
              disabled={editing || status === "completed"}
              variant="ghost"
              size="sm"
            >
              <Pencil size={16} className="text-blue-500" />
            </Button>
          )}
          {status === "expired" && (
            <span className="text-red-500 text-sm">Expired</span>
          )}
          <Button
            onClick={deleteTask}
            disabled={editing || status === "completed"}
            variant="ghost"
            size="sm"
          >
            <Trash2 size={16} className="text-red-500" />
          </Button>
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-2">{description}</div>
      <div className="mt-2 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Due:</span>
          <span
            className={cn(
              "font-medium",
              status === "expired" && "text-red-500",
              status === "completed" && "text-green-500",
              status === "pending" && "text-yellow-500"
            )}
          >
            {formattedDue}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Created:</span>
          <span className="text-gray-500">{formattedCreated}</span>
        </div>
      </div>
    </motion.div>
  );
}

import { TaskManager } from "@/components/TaskMaanger";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

export default async function Page() {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/task/getAll`);
    const tasks = res.data.data; // data = []
    console.log(process.env.BASE_URL);
    console.log(process.env.MONGO_URI);
    return (
      <div className="bg-slate-200 min-h-screen">
        <div className="lg:px-36 md:px-15 px-4 md:py-10 py-6 flex flex-col gap-4">
          <div>
            <h1 className="text-4xl tracking-tighter font-bold">
              Task Manager
            </h1>
            <p className="text-slate-500">
              Manage your tasks efficiently and become super productive.
            </p>
          </div>
          <div className="">
            <TaskManager tasks={tasks} />
          </div>
        </div>
        <Toaster />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Server Error</div>;
  }
}

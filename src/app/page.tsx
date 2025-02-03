import { TaskManager } from "@/components/TaskMaanger";
import { Toaster } from "@/components/ui/toaster";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  // Opt out of caching for this page
  noStore();

  try {
    // Use native fetch instead of axios
    const res = await fetch(`${process.env.BASE_URL}/api/task/getAll`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await res.json();
    const tasks = data.data;

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
    console.error(error);
    return (
      <div>Server Error: Failed to load tasks. Please try again later.</div>
    );
  }
}

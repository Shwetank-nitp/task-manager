import { LoadingSpinner } from "@/components/ui/spinner";

export function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-8">
      <LoadingSpinner />

      <p className="text-slate-500 text-lg">Loading your tasks</p>
    </div>
  );
}

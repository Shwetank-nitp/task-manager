import { connectToDb } from "@/lib/db/connect";
import { Task } from "@/lib/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: "Task Id is required" },
        { status: 400 }
      );
    }

    await connectToDb();
    const del = await Task.findByIdAndDelete(taskId);
    if (!del) {
      return NextResponse.json({ error: "Task Not Found" }, { status: 404 });
    }
    return NextResponse.json({ data: del }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

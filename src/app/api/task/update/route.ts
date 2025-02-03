import { connectToDb } from "@/lib/db/connect";
import { Task } from "@/lib/models/Task";
import { updateTaskSchema } from "@/lib/schema/zod.schema";
import { zodErrorMessage } from "@/lib/utils/zod.error";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("a request recived if ");
    try {
      const { id, ...restParsed } = updateTaskSchema.parse(body);

      await connectToDb();

      const task = await Task.findById(id);

      if (!task) {
        return NextResponse.json(
          { error: "No Task Found TO Update" },
          { status: 404 }
        );
      }
      const title = restParsed.title || task.title;
      const discription = restParsed.disc || task.discription;
      const due = restParsed.due || task.due;
      const status = restParsed.status || task.status;

      const update = await Task.findByIdAndUpdate(
        id,
        {
          title,
          discription,
          due,
          status,
        },
        { new: true }
      );

      if (!update) {
        return NextResponse.json(
          { error: "Cannot update you task try agian later" },
          { status: 500 }
        );
      }

      return NextResponse.json({ data: update }, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return NextResponse.json(
          { error: zodErrorMessage(error) },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create task" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

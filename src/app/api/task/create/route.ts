import { connectToDb } from "@/lib/db/connect";
import { Task } from "@/lib/models/Task";
import { createTaskSchema } from "@/lib/schema/zod.schema";
import { zodErrorMessage } from "@/lib/utils/zod.error";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const body = await req.json();

    try {
      const parsed = createTaskSchema.parse(body);
      const { title, disc, due } = parsed;

      const createNewTask = await Task.create({
        title: title,
        description: disc,
        due: due,
      });

      return NextResponse.json({ data: createNewTask }, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: zodErrorMessage(error) },
          { status: 400 }
        );
      }
      console.log(error);

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

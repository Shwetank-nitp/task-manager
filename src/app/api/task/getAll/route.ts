import { connectToDb } from "@/lib/db/connect";
import { Task } from "@/lib/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const nextUrl = await req.nextUrl;
    const constructUrl = new URL(nextUrl);
    const limit = Math.min(
      Number(constructUrl.searchParams.get("limit") || 10),
      100
    );
    const skip = Number(constructUrl.searchParams.get("skip") || 0);

    await connectToDb();
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

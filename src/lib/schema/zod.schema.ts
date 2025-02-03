import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  disc: z.string().min(10, "Description must be at least 10 characters"),
  due: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, "Invalid date format"),
});

export const updateTaskSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .min(10),
  title: z.optional(z.string().min(2, "Title must be at least 2 characters")),
  disc: z.optional(
    z.string().min(10, "Description must be at least 10 characters")
  ),
  due: z.optional(
    z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, "Invalid date format")
  ),
  status: z.optional(
    z.enum(["pending", "in progress", "completed", "expired"])
  ),
});

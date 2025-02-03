import { ZodError } from "zod";

export const zodErrorMessage = (error: ZodError) => {
  return error.issues.map((e) => e.path + ": " + e.message).join(", ");
};

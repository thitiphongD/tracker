import { Prisma } from "@prisma/client";
import { z } from "zod";

export const prismaErrorHandler = (
  error: Prisma.PrismaClientKnownRequestError
): z.ZodError => {
  const zodError = new z.ZodError([]);

  if (error.code === "P2002") {
    zodError.addIssue({
      code: z.ZodIssueCode.custom,
      path: (error.meta?.target as string[]) || [],
      message: "Email already to use!",
    });
  } else if (error.code === "P2014") {
    zodError.addIssue({
      code: z.ZodIssueCode.invalid_string,
      validation: "cuid",
      path: ["id"],
      message: "Invalid ID",
    });
  } else if (error.code === "P2003") {
    zodError.addIssue({
      code: z.ZodIssueCode.custom,
      path: [(error.meta?.field_name as string) || ""],
      message: "Related record not found",
    });
  }

  return zodError;
};

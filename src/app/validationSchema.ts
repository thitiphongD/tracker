import { z } from 'zod'

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is require').max(255),
    description: z.string().min(1, 'Description is require')
})

export const createUserSchema = z.object({
    name: z.string().trim(),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
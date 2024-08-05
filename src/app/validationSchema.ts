import { z } from 'zod'

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is require').max(255),
    description: z.string().min(1, 'Description is require')
})

export const createUserSchema = z.object({
    name: z.string().trim(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, 'Password must 8 character')
})
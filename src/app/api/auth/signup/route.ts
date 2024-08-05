import { createUserSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const validation = createUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 })
        }
        const hashPassword = bcrypt.hashSync(body.password, 10)

        const newUser = await prisma.user.create({
            data: { name: body.name, email: body.email, password: hashPassword }
        })
        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
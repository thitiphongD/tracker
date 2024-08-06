import { signUpUserSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { prismaErrorHandler } from "@/app/utils/prismaErrorHandler";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = signUpUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const hashPassword = bcrypt.hashSync(body.password, 10);

    const newUser = await prisma.user.create({
      data: { email: body.email, password: hashPassword },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const zodError = prismaErrorHandler(error);
      return NextResponse.json({ errors: zodError.issues }, { status: 400 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

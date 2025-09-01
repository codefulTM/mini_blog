import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export const POST = async (req: Request) => {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        name,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign up" }, { status: 400 });
  }
};

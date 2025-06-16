
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/db";
import { signToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  // Create JWT payload (you can customize fields)
  const token = signToken({ id: user.id, email: user.email, username: user.username });

  // Create response with cookie
  const response = NextResponse.json({ message: "User registered successfully", userId: user.id });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 5, // 5 min
    // secure: process.env.NODE_ENV === "production", // set secure flag in prod
    // sameSite: "lax",
  });

  return response;
}

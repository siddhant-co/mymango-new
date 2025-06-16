


// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/db";
import { signToken } from "@/app/lib/jwt";


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // Create JWT token with user info (you can add fields you need)
  const token = signToken({ id: user.id, email: user.email, username: user.username });

  // Create response and set HTTP-only cookie
  const response = NextResponse.json({ message: "Login successful",   customer: {
    id: user.id,
    username: user.username,
    email: user.email,
    token, // Include JWT so Redux can store it if needed
  },});

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 hour
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}

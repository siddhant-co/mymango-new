
import { sendOtpEmail } from "@/app/lib/email";
import { setOtp } from "@/app/lib/otpStore";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  await sendOtpEmail(email, otp); // your nodemailer setup
  setOtp(email, otp);             // store OTP temporarily

  return NextResponse.json({ message: "OTP sent successfully" });
}
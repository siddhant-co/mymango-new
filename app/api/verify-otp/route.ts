
import { getOtp, removeOtp } from "@/app/lib/otpStore";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  const storedOtp = getOtp(email);

  if (storedOtp !== otp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  removeOtp(email); // clean up after success
  return NextResponse.json({ message: "OTP verified" });
}

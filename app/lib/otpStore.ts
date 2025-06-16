const otpMap = new Map<string, string>();

export function setOtp(email: string, otp: string) {
  otpMap.set(email, otp);
  setTimeout(() => otpMap.delete(email), 5 * 60 * 1000); // expires in 5 mins
}

export function getOtp(email: string) {
  return otpMap.get(email);
}

export function removeOtp(email: string) {
  otpMap.delete(email);
}

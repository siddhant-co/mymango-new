export {};

declare global {
  interface Window {
    Razorpay: any;
  }
  var otpStore: Record<string, string>;
}


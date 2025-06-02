'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startForgotPasswordLoading,
  setForgotPasswordEmail,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetForgotPasswordState,
} from '@/store/slices/authSlice'; // adjust path if needed
import { RootState } from '@/store/store'; // adjust path if needed

export default function ForgotPassword() {
  const dispatch = useDispatch();

  // Reset forgot password state on component mount to clear any stale errors or flags
  useEffect(() => {
    dispatch(resetForgotPasswordState());
  }, [dispatch]);

  const forgotPassword = useSelector(
    (state: RootState) => state.auth.forgotPassword
  );

  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!emailInput) return alert('Please enter your email');
    dispatch(startForgotPasswordLoading());
    dispatch(setForgotPasswordEmail(emailInput));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/reset-password/customer/send-otp/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        dispatch(sendOtpSuccess());
      } else {
        dispatch(sendOtpFailure(data.message || 'Failed to send OTP'));
      }
    } catch (error: any) {
      dispatch(sendOtpFailure(error.message || 'Network error'));
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpInput) return alert('Please enter the OTP');
    dispatch(startForgotPasswordLoading());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/reset-password/verify-otp/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotPassword.email, otp: otpInput }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        dispatch(verifyOtpSuccess());
      } else {
        dispatch(verifyOtpFailure(data.message || 'OTP verification failed'));
      }
    } catch (error: any) {
      dispatch(verifyOtpFailure(error.message || 'Network error'));
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!password || !confirmPassword)
      return alert('Please enter and confirm your password');
    if (password !== confirmPassword) return alert('Passwords do not match');

    dispatch(startForgotPasswordLoading());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/reset-password/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: forgotPassword.email,
            otp: otpInput,
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok) {
          dispatch(resetPasswordSuccess());
          alert('Password reset successful! You can now log in.');
          dispatch(resetForgotPasswordState());
        } else {
          dispatch(resetPasswordFailure(data.message || 'Password reset failed'));
        }
      } else {
        // If response is not JSON, log it and show generic error
        const text = await res.text();
        console.error('Unexpected non-JSON response:', text);
        dispatch(
          resetPasswordFailure('Unexpected server response. Please try again later.')
        );
      }
    } catch (error: any) {
      dispatch(resetPasswordFailure(error.message || 'Network error'));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl mb-6 text-center font-semibold">Forgot Password</h2>

      {/* Step 1: Send OTP */}
      {!forgotPassword.otpSent && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled={forgotPassword.loading}
          />
          <button
            onClick={handleSendOtp}
            disabled={forgotPassword.loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {forgotPassword.loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
          {forgotPassword.error && (
            <p className="mt-2 text-red-600 text-center">{forgotPassword.error}</p>
          )}
        </>
      )}

      {/* Step 2: Verify OTP */}
      {forgotPassword.otpSent && !forgotPassword.otpVerified && (
        <>
          <p className="mb-2">
            OTP sent to <strong>{forgotPassword.email}</strong>
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled={forgotPassword.loading}
          />
          <button
            onClick={handleVerifyOtp}
            disabled={forgotPassword.loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            {forgotPassword.loading ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
          {forgotPassword.error && (
            <p className="mt-2 text-red-600 text-center">{forgotPassword.error}</p>
          )}
        </>
      )}

      {/* Step 3: Reset Password */}
      {forgotPassword.otpVerified && !forgotPassword.resetSuccess && (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled={forgotPassword.loading}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            disabled={forgotPassword.loading}
          />
          <button
            onClick={handleResetPassword}
            disabled={forgotPassword.loading}
            className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
          >
            {forgotPassword.loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
          {forgotPassword.error && (
            <p className="mt-2 text-red-600 text-center">{forgotPassword.error}</p>
          )}
        </>
      )}

      {/* Success Message */}
      {forgotPassword.resetSuccess && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          Password reset successful! You can now log in.
        </p>
      )}
    </div>
  );
}

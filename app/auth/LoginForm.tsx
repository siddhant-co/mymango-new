'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuthData } from '@/store/slices/authSlice';
import Link from 'next/link';  // <-- Import Link from next/link

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setMessage('');

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    if (!password) {
      setMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/customer-login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);

        if (res.ok) {
          if (data.token && data.id) {
            dispatch(setAuthData({
              token: data.token,
              customer: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone_number?.toString() || '',
              },
            }));
            console.log('Dispatched auth data:', data);
            setMessage('Login successful!');
            router.push('/');
          } else {
            setMessage('Invalid response from server.');
          }
        } else {
          setMessage(data.message || 'Login failed.');
        }
      } catch {
        setMessage(`Unexpected server response:\n${text}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded bg-[#fff7f5] border-[#91ca02]"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-1 border rounded bg-[#fff7f5] border-[#91ca02]"
      />

      {/* Forgot Password Link */}
      <div className="mb-4 text-right">
        <Link href="/ForgotPassword" className="text-sm text-orange-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-[#fb4b02] cursor-pointer text-white p-2 rounded"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500 whitespace-pre-line">{message}</p>
      )}
    </div>
  );
}

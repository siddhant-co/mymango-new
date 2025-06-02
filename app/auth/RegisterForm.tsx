'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);


  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://nxadmin.consociate.co.in/user/verify-email/customer/send-otp/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      if (res.ok) {
        setMessage('OTP sent to your email.');
        setStep(2);
      } else {
        const data = await res.json();
        setMessage(JSON.stringify(data));
      }
    } catch {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://nxadmin.consociate.co.in/user/verify-email/verify-otp/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        }
      );
      if (res.ok) {
        setMessage('OTP verified!');
        setStep(3);
      } else {
        const data = await res.json();
        setMessage(JSON.stringify(data));
      }
    } catch {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Register User
  const registerUser = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phoneNumber);
      formData.append('country_code_for_phone_number', countryCode);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }
      formData.append('address', address);
      formData.append('locality', locality);
      formData.append('city', city);
      formData.append('state', stateName);
      formData.append('country', country);
      formData.append('zipcode', zipcode);
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);
      formData.append('terms_accepted', 'True');

      const res = await fetch('https://nxadmin.consociate.co.in/user/customer-registration/', {
        method: 'POST',
        body: formData,
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);

        if (res.ok) {
          setMessage('Registered successfully!');
          setStep(1);
          setEmail('');
          setOtp('');
          setPassword('');
          setConfirmPassword('');
          setFirstName('');
          setLastName('');
          setPhoneNumber('');
          setCountryCode('+91');
          setProfilePicture(null);
          setAddress('');
          setLocality('');
          setCity('');
          setStateName('');
          setCountry('');
          setZipcode('');
        } else {
          setMessage(
            Object.entries(data)
              .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
              .join('\n')
          );
        }
      } catch {
        setMessage(`Unexpected server response:\n${text}`);
      }
    } catch {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            disabled={loading || !email}
            className="w-full bg-[#fb4b02] text-white p-2 rounded"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            disabled={loading || !otp}
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              placeholder="Country Code"
              className="w-1/4 p-2 border rounded bg-[#fff7f5] border-[#91ca02]"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-3/4 p-2 border rounded bg-[#fff7f5] border-[#91ca02]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="mb-3"
            onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Locality"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Zipcode"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded mb-3 bg-[#fff7f5] border-[#91ca02]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={registerUser}
            disabled={loading || !password || !confirmPassword}
            className="w-full bg-purple-600 text-white p-2 rounded"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </>
      )}

      {message && (
        <pre className="mt-4 p-2 bg-gray-100 text-red-600 whitespace-pre-wrap text-sm">
          {message}
        </pre>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { useState, useRef, useEffect } from 'react';

export default function UserAvatar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const customer = useSelector((state: RootState) => state.auth.customer);
  const firstName = customer?.first_name || '';
  const lastName = customer?.last_name || '';
  const initials = `${firstName[0]}${lastName?.[0] || ''}`.toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth');
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!firstName) {
    return (
      <Link href="/auth" aria-label="Login">
        <CircleUserRound className="w-7 h-7 text-gray-800 hover:text-orange-500 transition" />
      </Link>
    );
  }

  return (
    <div className="relative mt-3" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={toggleMenu}
        className="hidden lg:flex items-center space-x-2 bg-white px-2 py-1 rounded-full shadow border border-gray-200 hover:shadow-md cursor-pointer transition-all"

      >
        {/* Initials */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-sm uppercase">
          {initials}
        </div>

        {/* Name (hidden on mobile/tablet) */}
        <span className="hidden md:inline text-gray-800 font-medium text-sm">
          {firstName}
        </span>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

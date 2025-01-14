'use client';

import { useAuth } from '@/app/lib/authContext';
import { logout } from '@/app/lib/auth';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import LoginIcon from '@/assets/login.svg';
import LogoutIcon from '@/assets/logout.svg';
import HamburgerIcon from './HamburgerIcon';
import Image from 'next/image';

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log('Logging out...');
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex   bg-transparent text-white  w-full  z-30 absolute ">
        {/* Logo Section */}
        <div className="absolute top-0 left-0 p-4">
          <NavLogoSection />
        </div>
        {/* Links */}

        {/* Login/Logout */}
        <div className="absolute top-0 right-0 p-4">
          <NavAuthLinks user={user} onLogout={handleLogout} />
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="flex lg:hidden bg-transparent text-white  w-full  z-30 absolute">
        {/* Hamburger icon */}
        <button className="absolute top-0 right-0 p-4">
          <HamburgerIcon
            onClick={() => {
              setIsOpen(!isOpen);
              // console.log('isOpen:', isOpen);
            }}
          />
        </button>
        {isOpen && (
          <div className="w-full justify-center justify-items-center  bg-backgroundlight p-12">
            <NavLogoSection />

            <NavAuthLinks user={user} onLogout={handleLogout} />
          </div>
        )}
      </nav>
    </>
  );
}

function NavLogoSection({}) {
  return (
    <Link href="/">
      <div className="flex items-center mb-6 bg-background p-4 ">
        <Image src="/favicon.png" alt="Logo" width={45} height={45} />
        <h1 className="text-2xl font-bold">PRODIFY</h1>
      </div>
    </Link>
  );
}

function NavAuthLinks({ user, onLogout }) {
  return user ? (
    <NavbarLink href="/login" onClick={onLogout}>
      <LogoutIcon className="fill-textColor " />
      Logout
    </NavbarLink>
  ) : (
    <NavbarLink href="/login">
      <LoginIcon className="fill-textColor " />
      Login
    </NavbarLink>
  );
}
function NavbarLink({ href, onClick, children }) {
  const pathname = usePathname();

  return (
    <Link
      className={`flex font-semibold text-white/50 flex-row items-end p-2 gap-4 hover:text-primary 
     `}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

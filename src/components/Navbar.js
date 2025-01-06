'use client';

import { useAuth } from '@/app/lib/authContext';
import { logout } from '@/app/lib/auth';
import NavbarLink from './NavbarLink';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

import HomeIcon from '@/assets/home.svg';
import TasksIcon from '@/assets/tasks.svg';
import VisionIcon from '@/assets/vision.svg';
import ImproveIcon from '@/assets/improve.svg';
import LoginIcon from '@/assets/login.svg';
import LogoutIcon from '@/assets/logout.svg';
import SettingsIcon from '@/assets/settings.svg';

import tailwindConfig from '../../tailwind.config';

const primaryColor = tailwindConfig.theme.extend.colors.primary;

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log('Logging out...');
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-backgroundlight text-white w-52 h-full flex-col p-4 z-10 top-0 left-0">
        {/* Logo Section */}
        <NavLogoSection />
        {/* Links */}
        <NavLinks />
        {/* Login/Logout */}
        <NavAuthLinks user={user} onLogout={handleLogout} />
        );
      </nav>

      {/* Mobile Navbar */}
    </>
  );
}

function NavLogoSection({}) {
  return (
    <Link href="/">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">PRODIFY</h1>
      </div>
    </Link>
  );
}

function NavLinks() {
  const links = [
    { href: '/tasks', icon: <TasksIcon />, label: 'Tasks' },
    { href: '/vision', icon: <VisionIcon />, label: 'Vision' },
    { href: '/improve', icon: <ImproveIcon />, label: 'Improve' },
    { href: '/settings', icon: <SettingsIcon />, label: 'Settings' }
  ];

  return (
    <div className="flex flex-col gap-4 flex-1 mt-2">
      {links.map(({ href, icon, label }) => (
        <NavbarLink key={href} href={href}>
          {icon}
          {label}
        </NavbarLink>
      ))}
    </div>
  );
}
function NavAuthLinks({ user, onLogout }) {
  return user ? (
    <NavbarLink href="/login" onClick={onLogout}>
      <LogoutIcon fill={primaryColor} />
      Logout
    </NavbarLink>
  ) : (
    <NavbarLink href="/login">
      <LoginIcon fill={primaryColor} />
      Login
    </NavbarLink>
  );
}

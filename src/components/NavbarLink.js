'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarLink({ href, onClick, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={`flex font-semibold text-white/60 flex-row items-end p-2 gap-4 hover:bg-primary/30 
    rounded-full ${isActive ? 'bg-primary/30 text-white/100' : ''}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

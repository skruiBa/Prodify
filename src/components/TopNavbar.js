'use client';

import { useAuth } from '@/app/lib/authContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function TopNavbar(props) {
  const { user } = useAuth();
  const pathname = usePathname();

  //print test useeffect
  useEffect(() => {
    console.log('TopNavbar rendered' + props.test);
  }, []);

  return (
    <nav className="bg-backgroundlight text-white h-16 w-full flex items-center justify-between px-6 shadow z-20">
      <div className="flex items-center">
        {/* Left side: Dynamic pathname */}
        <h1 className="text-lg font-bold">
          {pathname === '/'
            ? 'Home'
            : pathname.split('/').pop().charAt(0).toUpperCase() + pathname.split('/').pop().slice(1)}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Right side: content something other than user info*/}
        <p className="text-sm">{props.test}</p>
      </div>
    </nav>
  );
}

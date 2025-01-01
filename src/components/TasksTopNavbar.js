'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { formatDate, getDayName } from '@/app/lib/helper';

export default function TasksTopNavbar({ currentDate }) {
  const pathname = usePathname();

  return (
    <nav className="bg-backgroundlight h-20 w-full flex items-center justify-between px-6 z-20">
      {/* Left section */}
      <div>{/* <h1 className="text-2xl font-bold">{pathname.split('/').pop()}</h1> */}</div>

      {/* Center section */}
      <DateNavigator currentDate={currentDate} />

      {/* Right section */}
      <div></div>
    </nav>
  );
}

const DateNavigator = ({ currentDate }) => {
  const dayClassName = 'text-center';
  const offDayClassName = 'text-white/50';

  // Calculate previous and next dates
  const previousDate = new Date(currentDate);
  previousDate.setDate(previousDate.getDate() - 1);

  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);

  return (
    <div className="flex flex-row items-center gap-8">
      {/* Left Navigation arrow */}
      <div>
        <p>← </p>
      </div>
      {/* Left (Previous Day) */}
      <div className={`${dayClassName} ${offDayClassName}`}>
        <p>{getDayName(previousDate)}</p>
        <p>{formatDate(previousDate.toLocaleDateString())}</p>
      </div>
      {/* Middle (Current Day) */}
      <div className={dayClassName}>
        <p>{getDayName(new Date(currentDate))}</p>
        <p>{formatDate(new Date(currentDate))}</p>
      </div>
      {/* Right (Next Day) */}
      <div className={`${dayClassName} ${offDayClassName}`}>
        <p>{getDayName(nextDate)}</p>
        <p>{formatDate(nextDate.toLocaleDateString())}</p>
      </div>
      {/* Right Navigation arrow */}
      <button
        onClick={() => {
          console.log('Right arrow clicked');
        }}
      >
        <p>→</p>
      </button>
    </div>
  );
};

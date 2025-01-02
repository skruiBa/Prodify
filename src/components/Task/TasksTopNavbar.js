'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { formatDate, getDayName } from '@/app/lib/helper';

export default function TasksTopNavbar({ currentDate }) {
  if (!currentDate) return null;
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

  const generateFutureDates = (startDate, daysCount) => {
    const dates = [];
    for (let i = 1; i <= daysCount; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  };
  const futureDates = generateFutureDates(currentDate, 5); // Get 5 future dates
  return (
    <div className="flex flex-row items-center gap-8">
      {/* Left Navigation arrow */}
      <button>
        <p>← </p>
      </button>

      {/* Middle (Current Day) */}
      <div className={dayClassName}>
        <p>{getDayName(currentDate)}</p>
        <p>{formatDate(currentDate)}</p>
      </div>

      {/* Future Dates */}
      <div className="flex flex-row gap-4">
        {futureDates.map((date, index) => (
          <div key={index} className={dayClassName}>
            <p>{getDayName(date)}</p>
            <p>{formatDate(date)}</p>
          </div>
        ))}
      </div>
      {/* Right Navigation arrow */}
      <button>
        <p>→</p>
      </button>
    </div>
  );
};

'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { formatDate, getDayName } from '@/app/lib/helper';
import { useDate } from '@/app/lib/dateContext';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

export default function TasksTopNavbar({}) {
  const { currentDate, updateCurrentDate } = useDate();
  const pathname = usePathname();

  return (
    <nav className="bg-backgroundlight h-20 w-full flex items-center justify-between px-6 z-20">
      {/* Left section */}
      <div className=" items-center relative">
        <label htmlFor="date" className="cursor-pointer">
          📅
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          value={currentDate.toISOString().split('T')[0]} // Format to YYYY-MM-DD
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            if (!selectedDate || isNaN(selectedDate.getTime())) return;
            updateCurrentDate(selectedDate);
          }}
        />
      </div>

      {/* Center section */}
      <div className="flex flex-row items-center gap-4">
        <PrimaryButton onClick={() => updateCurrentDate(new Date())}>Today</PrimaryButton>
        <DateNavigator currentDate={currentDate} />
      </div>

      {/* Right section */}
      <div>
        <PrimaryButton onClick={() => {}}></PrimaryButton>
      </div>
    </nav>
  );
}

const DateNavigator = ({}) => {
  const { currentDate, updateCurrentDate } = useDate();

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

  const onClick = (date) => {
    console.log('Date clicked:', date);
    updateCurrentDate(date);
  };

  return (
    // start
    <div className="flex flex-row  items-center gap-8">
      {/* Middle (Current Day) */}
      <div className={dayClassName}>
        <button onClick={() => onClick(currentDate)}>
          <p>{getDayName(currentDate)}</p>
          <p>{formatDate(currentDate)}</p>
        </button>
      </div>

      {/* Future Dates */}
      <div className="flex flex-row gap-8">
        {futureDates.map((date, index) => (
          <DateButton key={index} date={date} className={offDayClassName} onClick={() => onClick(date)} />
        ))}
      </div>
    </div>
  );
};

const DateButton = ({ date, className, onClick }) => {
  return (
    <div className={className}>
      <button onClick={() => onClick(date)}>
        <p>{getDayName(date)}</p>
        <p>{formatDate(date)}</p>
      </button>
    </div>
  );
};

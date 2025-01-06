'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { formatDate, getDayName } from '@/app/lib/helper';
import { useDate } from '@/app/lib/dateContext';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import InputField from '../InputField';

export default function TasksTopNavbar({}) {
  const { currentDate, updateCurrentDate } = useDate();
  const pathname = usePathname();

  return (
    <nav className="bg-backgroundlight h-20 w-full flex items-center justify-start gap-12 px-8 z-20">
      {/* Left section */}
      <div className="items-center relative ">
        <label htmlFor="date" className="text-white/60 cursor-pointer">
          Date
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
      <DateNavigator currentDate={currentDate} />
    </nav>
  );
}

const DateNavigator = ({}) => {
  const { currentDate, updateCurrentDate } = useDate();

  const dayClassName = 'text-center h-full w-auto flex flex-col items-center justify-center';
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
  const futureDates = generateFutureDates(currentDate, 2); // Get future dates

  const onClick = (date) => {
    console.log('Date clicked:', date);
    updateCurrentDate(date);
  };

  return (
    <div className="flex flex-row items-center gap-8">
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
    <div className={`${className} flex flex-col items-center`}>
      <button className="flex flex-col items-center" onClick={() => onClick(date)}>
        <p>{getDayName(date)}</p>
        <p>{formatDate(date)}</p>
      </button>
      {/* Primary color box */}
      <div className="w-full h-1 mt-1  bg-primary"></div>
    </div>
  );
};

'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { formatDate, getDayName } from '@/app/lib/helper';
import { useDate } from '@/app/lib/dateContext';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import InputField from '../InputField';

export default function TasksTopNavbar({}) {
  const { currentDate, updateCurrentDate } = useDate();
  const pathname = usePathname();

  return (
    <nav className="bg-transparent h-20 w-full flex items-center justify-center gap-12 px-8 z-20">
      {/* Left section */}

      <DateNavigator currentDate={currentDate} />
    </nav>
  );
}

const DateNavigator = ({}) => {
  const { currentDate, updateCurrentDate } = useDate();

  // Compute the current week's 7-day range (Monday to Sunday)
  const futureDates = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Adjust if the day is Sunday (0), set to last Monday
    startOfWeek.setDate(currentDate.getDate() + diff);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  }, [currentDate]);

  const onClick = (date) => {
    console.log('Date clicked:', date);
    updateCurrentDate(date); // Update the selected date
  };

  return (
    <div className="flex flex-row items-center gap-8 h-full">
      <div className="text-center h-full w-auto flex flex-row items-center justify-center gap-4">
        {futureDates.map((date, index) => (
          <DateButton
            key={index}
            date={date}
            className={date.toDateString() === currentDate.toDateString() ? 'text-white' : 'text-white/50'}
            boxClassname={date.toDateString() === currentDate.toDateString() ? 'bg-primary h-4' : 'bg-primary/50'}
            onClick={() => onClick(date)}
          />
        ))}
      </div>
    </div>
  );
};

const DateButton = ({ date, className, boxClassname, onClick }) => {
  return (
    <div className={`${className} flex flex-col items-center relative bottom-0 h-full w-28 justify-center`}>
      <button className="flex flex-row items-center gap-2 text-xl  " onClick={() => onClick(date)}>
        <p>{getDayName(date)}</p>
        <p>{formatDate(date)}</p>
      </button>
      {/* Primary color box */}
      <div className={`w-full h-2  absolute top-0 ${boxClassname}`}></div>
    </div>
  );
};

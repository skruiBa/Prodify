'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatDate, getDayName } from '@/app/lib/helper';
import { useDate } from '@/app/lib/dateContext';

export default function TasksTopNavbar({}) {
  const { currentDate, updateCurrentDate } = useDate();

  return (
    <nav className="bg-transparent h-20 w-full absolute top-0  items-center justify-items-center gap-12 px-8 z-20">
      <DateNavigator currentDate={currentDate} />
    </nav>
  );
}

const DateNavigator = () => {
  const { currentDate, updateCurrentDate } = useDate();
  const [maxDates, setMaxDates] = useState(7); // Default to 7 dates

  // Update maxDates based on screen size
  useEffect(() => {
    const updateMaxDates = () => {
      if (window.innerWidth < 500) {
        setMaxDates(2); // Show only 3 dates on small screens
      } else if (window.innerWidth < 740) {
        setMaxDates(3); // Show only 5 dates on medium screens
      } else if (window.innerWidth < 1024) {
        setMaxDates(5); // Show only 5 dates on medium screens
      } else {
        setMaxDates(7); // Show all 7 dates on larger screens
      }
    };

    updateMaxDates();
    window.addEventListener('resize', updateMaxDates);

    return () => window.removeEventListener('resize', updateMaxDates);
  }, []);

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

    // Handle limiting dates on small screens
    if (maxDates < 7) {
      const selectedIndex = dates.findIndex((date) => date.toDateString() === currentDate.toDateString());
      const start = Math.max(0, selectedIndex - Math.floor(maxDates / 2));
      const end = Math.min(dates.length, start + maxDates);
      return dates.slice(start, end);
    }

    return dates;
  }, [currentDate, maxDates]);

  const onClick = (date) => {
    console.log('Date clicked:', date);
    updateCurrentDate(date); // Update the selected date
  };

  return (
    <div className="flex flex-row items-center justify-center gap-8 h-full">
      <div className="text-center h-full w-auto flex flex-row items-center justify-center gap-2">
        {futureDates.map((date, index) => (
          <DateButton
            key={index}
            date={date}
            className={date.toDateString() === currentDate.toDateString() ? 'text-textColor' : 'text-textColor/50'}
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
    <div
      className={`${className} flex flex-col items-center relative bottom-0 h-full w-28 justify-center cursor-pointer group`}
      onClick={() => onClick(date)} // Make the whole area clickable
    >
      <div className="flex flex-row items-center gap-2 text-xl group-hover:text-primary">
        <p>{getDayName(date)}</p>
        <p>{formatDate(date)}</p>
      </div>
      {/* Primary color box */}
      <div
        className={`w-full h-2  absolute top-0 transition-all duration-300 ease-in-out group-hover:h-4 ${boxClassname}`}
      ></div>
    </div>
  );
};

// src/utils/helper.js

export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const formatDate = ({ date }) => {
  if (!date) return null;

  console.log('formatDate called with date:', date);

  const dateReturn = date?.toLocaleDateString('en-FI', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  return dateReturn;
};

export const getDayName = ({ date }) => new Intl.DateTimeFormat('en-FI', { weekday: 'long' }).format(date);

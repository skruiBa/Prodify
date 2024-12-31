// src/utils/helper.js

export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const formatDate = (date) => {
  if (date === null) {
    console.log('date is null');
    return;
  }
  const dateReturn = date?.toLocaleDateString('en-FI', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
  // If date is today, return with date and "today"

  if (date.toDateString() === new Date().toDateString()) {
    return `${dateReturn} (Today)`;
  }
  return dateReturn;
};

export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

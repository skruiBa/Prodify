// src/utils/helper.js

export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const formatDate = (date) => {
  if (!date) return null;

  const dateReturn = date.toLocaleDateString('en-FI', {
    day: '2-digit'
    // month: 'numeric',
    // year: 'numeric'
  });

  return dateReturn;
};

export const formatDateForFirebase = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDayName = (date) => new Intl.DateTimeFormat('en-FI', { weekday: 'short' }).format(date);

export function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

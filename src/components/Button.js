'use client';

export default function Button({ children, onClick, className }) {
  const baseClasses =
    ' flex flex-row w-full bg-dark-3 hover:bg-dark-5 text-white px-4 py-2 items-center justify-center rounded transition-transform duration-150 ease-in-out active:scale-95';
  return (
    <button onClick={onClick} className={`${baseClasses}`}>
      {children}
    </button>
  );
}

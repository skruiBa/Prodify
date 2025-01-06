import React from 'react';

export default function InputField({
  label,
  id,
  type = 'text',
  className = 'bg-background w-full p-4 h-12',
  placeholder = '',
  value,
  onChange
}) {
  return (
    <div className="flex flex-col items-start w-full">
      {label && (
        <label htmlFor={id} className="text-white/60">
          {label}
        </label>
      )}
      <input id={id} type={type} className={className} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

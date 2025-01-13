import { useState } from 'react';

export default function CustomCheckbox({ checked, onChange, color }) {
  const [animate, setAnimate] = useState(false);

  const handleClick = (e) => {
    // Trigger animation on click
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); // Reset animation after 500ms
    onChange(e); // Call the parent's onChange handler
  };

  return (
    <label className="flex items-center justify-center">
      <div className="relative">
        {/* Checkbox Input */}
        <input
          type="checkbox"
          className={`appearance-none w-7 h-7 border-4 border-primary bg-backgroundlight cursor-pointer flex items-center justify-center
            ${checked ? 'bg-primary' : ''} focus:outline-none ${animate ? 'animate-fade-in' : ''}`}
          checked={checked}
          onChange={handleClick}
          style={{
            borderColor: color,
            backgroundColor: checked ? color : 'transparent'
          }}
        />
      </div>
    </label>
  );
}

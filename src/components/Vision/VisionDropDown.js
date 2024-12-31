'use client';

import { useState } from 'react';
import Button from '../Button';

export default function VisionDropDown({ vision, onCompleteClick, onEditClick, onRemoveClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full bg-dark-6 text-white p-4 rounded mb-4 shadow">
      {/* Dropdown Header */}
      <div onClick={toggleDropdown} className="flex justify-between items-center cursor-pointer">
        <h2
          className={`text-lg select-none disabled font-bold ${
            vision.progress === 100 ? 'line-through text-gray-400' : ''
          }`}
        >
          {vision.name}
        </h2>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="mt-4">
          <p>
            <strong>Category:</strong> {vision.category}
          </p>
          <p>
            <strong>Deadline:</strong> {vision.deadline}
          </p>
          <p>
            <strong>Description:</strong> {vision.description}
          </p>

          {/* Milestones */}
          <ul className="list-disc pl-5 mt-2">
            <strong>Milestones:</strong>
            {vision.milestones.map((milestone, index) => (
              <li key={index}>{milestone}</li>
            ))}
          </ul>

          {/* Pictures */}
          {/* <div className="mt-4">
            <strong>Motivation:</strong>
            <div className="grid grid-cols-3 gap-2">
              {vision.pictures.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Motivation ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          </div> */}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button onClick={onCompleteClick}>Mark as Complete</Button>
            <Button onClick={onEditClick}>Edit</Button>
            <Button onClick={onRemoveClick}>Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
}

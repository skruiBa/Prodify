'use client';

import { useState, useEffect } from 'react';
import MiniTaskList from './MiniTaskList.js';
import Checkbox from '../Checkbox.js';

export default function TaskItem({ task, onChange, onRemove }) {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Main Task completion
  const handleTaskCompletion = (completed) => {
    onChange(task.id, 'completed', completed);
  };

  // Sends signal to /tasks to update mini tasks
  const handleMiniTaskChange = (index, field, value) => {
    const updatedMiniTasks = [...task.miniTasks];

    if (field === null) {
      // Adding a new mini-task
      updatedMiniTasks.push(value);
    } else {
      // Updating an existing mini-task
      updatedMiniTasks[index] = { ...updatedMiniTasks[index], [field]: value };
    }

    onChange(task.id, 'miniTasks', updatedMiniTasks); // Update the task with new mini-tasks
  };

  return (
    <div className="p-4 bg-dark-6 rounded shadow flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={(e) => handleTaskCompletion(e.target.checked)}
          className="w-5 h-5"
        />
        {/* Task name */}
        <input
          className={`text-lg font-bold bg-transparent outline-none ${
            task.completed ? 'line-through text-gray-500' : 'text-white'
          }`}
          type="text"
          value={task.name}
          onChange={(e) => onChange(task.id, 'name', e.target.value)}
          disabled={task.completed} // Optionally disable editing when completed
        />
        {/* Task time */}
        <input
          className="text-lg text-slate-400 font-italics bg-transparent outline-none"
          type="time"
          value={task.time}
          onChange={(e) => onChange(task.id, 'time', e.target.value)}
        />
        {/* Dropdown */}
        <span
          onClick={toggleDropdown}
          className={`cursor-pointer transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <MiniTaskList
          task={task}
          miniTasks={task.miniTasks || []}
          onMiniTaskChange={handleMiniTaskChange}
          onRemove={onRemove}
        />
      )}
    </div>
  );
}

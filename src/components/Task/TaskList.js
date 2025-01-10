'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/authContext';
import { formatDate, formatTime, debounce, formatDateForFirebase } from '@/app/lib/helper';
import { fsTasksSnapshot, fsAddTask, fsUpdateTask, fsDeleteTask } from '@/app/lib/firestore';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { useDate } from '@/app/lib/dateContext';
import TaskInput from './TaskInput';
import PageWrapper from '../PageWrapper';
import TertiaryButton from '../TertiaryButton';
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Task being edited
  const { currentDate, updateCurrentDate } = useDate();
  const { user } = useAuth();

  useEffect(() => {
    if (!currentDate || !user) return;

    const formattedDate = formatDateForFirebase(currentDate);
    const unsubscribe = fsTasksSnapshot(user.uid, formattedDate, setTasks);

    console.log('Listening to tasks for date:', formatDateForFirebase(currentDate));

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [currentDate, user]);

  const handleAddTask = (taskData) => {
    taskData.date = formatDateForFirebase(currentDate); // add date
    console.log(taskData); // debug
    fsAddTask(user.uid, taskData, taskData.date);
  };

  const handleDeleteTask = (taskId) => {
    console.log('Deleting task with ID:', taskId);
    fsDeleteTask(user.uid, taskId, formatDateForFirebase(currentDate)); // add date
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = (taskId, updatedData) => {
    console.log('Updated task ID with data:', taskId, updatedData);
    fsUpdateTask(user.uid, taskId, updatedData, formatDateForFirebase(currentDate));
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task)));
  };

  return (
    <PageWrapper>
      {/* Task Input */}
      <TaskInput
        onSubmit={handleAddTask}
        task={editingTask}
        onUpdate={handleUpdateTask}
        onCancel={() => setEditingTask(null)}
      />

      {/* Task List */}
      <ul className="flex flex-col gap-2 w-full mx-auto mt-14 ">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={() => {
              console.log('Editing task with ID:', task.id);

              setEditingTask(task);
            }} // Pass task to edit
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </ul>
    </PageWrapper>
  );
}

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const { currentDate, updateCurrentDate } = useDate();
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleComplete = (e) => {
    const updatedCompleted = e.target.checked;
    fsUpdateTask(user.uid, task.id, { completed: updatedCompleted }, formatDateForFirebase(currentDate));
  };
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <>
      <div className="flex flex-col bg-backgroundlight w-full items-start justify-between p-4 gap-4">
        {/* Task Row */}

        <div className="flex w-full flex-row items-center justify-between h-8">
          <div className="flex-1 flex-row flex gap-4 items-center">
            {/* Checkbox */}
            <input type="checkbox" className="custom-checkbox" onChange={handleComplete} checked={task.completed} />

            <label className={`bg-transparent   ${task.completed ? 'line-through opacity-50' : ''}`}>
              {task.title}
            </label>
            {/* Expand/Collapse Button */}
            {task.miniTasks && task.miniTasks.tasks.length > 0 && (
              <TertiaryButton onClick={toggleExpand}>{isExpanded ? ' ⬆' : ' ⬇'}</TertiaryButton>
            )}
          </div>

          <div className="flex flex-row items-center gap-4">
            {/* Time */}
            <label className="bg-transparent">{task.time}</label>

            {/* Edit & Delete buttons */}
            <TertiaryButton className="bg-transparent" onClick={() => onUpdate(task)}>
              Edit
            </TertiaryButton>
            <TertiaryButton className="bg-transparent" onClick={onDelete}>
              Delete
            </TertiaryButton>
          </div>
        </div>

        {/* Expanded Mini-Tasks Section */}
        {isExpanded && (
          <div className="w-full bg-backgroundlight p-4 rounded-md">
            <ul className="list-disc list-inside">
              {task.miniTasks.tasks.map((task, index) => (
                <li key={index} className={`${task.completed ? 'line-through opacity-50' : ''}`}>
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

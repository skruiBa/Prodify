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
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const { currentDate, updateCurrentDate } = useDate();
  const { user } = useAuth();

  // Firestore Snapshot listener
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
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    fsDeleteTask(user.uid, taskId, formatDateForFirebase(currentDate)); // add date
  };

  // const handleUpdateTask = (taskId, updatedData) => {
  //   fsUpdateTask(user.uid, taskId, updatedData, formatDateForFirebase(currentDate)); // add date
  // };
  return (
    <PageWrapper>
      {/* Task Input */}
      <TaskInput onSubmit={handleAddTask} />

      {/* Task List */}
      <ul className="flex flex-col gap-2 w-full mx-auto mt-14 ">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={(updatedData) => handleUpdateTask(task.id, updatedData)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </ul>
    </PageWrapper>
  );
}

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(task.title);
  const [time, setTime] = useState(task.time);
  const [completed, setCompleted] = useState(task.completed);

  return (
    <div className="flex flex-row bg-backgroundlight w-full items-center justify-between h-8 p-8 mx-auto">
      <div className="flex-1 flex-row flex gap-4 ">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="custom-checkbox"
          onChange={(e) => setCompleted(e.target.checked)}
          checked={completed}
        />

        {/* Title */}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`bg-transparent ${completed ? 'line-through opacity-50' : ''}`}
          disabled
        />
      </div>

      <div className="flex flex-row items-center gap-4">
        {/* Time */}
        <SecondaryButton>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-transparent" />
        </SecondaryButton>
        <button className="bg-transparent" onClick={() => onUpdate({ title, time, completed })}>
          Edit
        </button>
        <button className="bg-transparent" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

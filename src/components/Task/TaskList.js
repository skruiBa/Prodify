'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/authContext';
import { formatDateForFirebase } from '@/app/lib/helper';
import { fsTasksSnapshot, fsAddTask, fsUpdateTask, fsDeleteTask } from '@/app/lib/firestore';

import { useDate } from '@/app/lib/dateContext';
import TaskInput from './TaskInput';
import PageWrapper from '../PageWrapper';

import Checkbox from '@/components/Checkbox';
import Submenu from '@/components/Submenu';
import ClockIcon from '@/assets/clock.svg';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const { currentDate, updateCurrentDate } = useDate();
  const { user } = useAuth();

  useEffect(() => {
    if (!currentDate || !user) return;

    const formattedDate = formatDateForFirebase(currentDate);
    const unsubscribe = fsTasksSnapshot(user.uid, formattedDate, setTasks);

    // console.log('Listening to tasks for date:', formatDateForFirebase(currentDate));

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [currentDate, user]);

  const handleAddTask = (taskData) => {
    if (!user) {
      alert('Please sign in to add tasks.');
      return;
    }
    taskData.date = formatDateForFirebase(currentDate); // add date
    // console.log(taskData); // debug

    // Add the task to Firestore and track its ID

    fsAddTask(user.uid, taskData, taskData.date);
  };

  const handleDeleteTask = (taskId) => {
    // console.log('Deleting task with ID:', taskId);
    fsDeleteTask(user.uid, taskId, formatDateForFirebase(currentDate)); // add date
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = (taskId, key, value) => {
    // Extract the actual value from the object
    const extractedValue = value[key];

    // console.log('Updating task with ID:', taskId, 'and key:', key, 'to value:', extractedValue);
    fsUpdateTask(user.uid, taskId, { [key]: extractedValue }, formatDateForFirebase(currentDate));
  };

  return (
    <PageWrapper>
      {/* Task Input */}
      <TaskInput onSubmit={handleAddTask} />

      {/* TaskList populated with TaskItems */}
      <ul className="flex flex-col gap-2 w-full h-full mx-auto   ">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={(key, value) => handleUpdateTask(task.id, key, value)}
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

  const handleComplete = (e) => {
    fsUpdateTask(user.uid, task.id, { completed: e.target.checked }, formatDateForFirebase(currentDate));
  };

  return (
    <>
      <div className={`w-full relative animate-fade-in `}>
        {/* Task Row */}
        <div
          className="flex flex-row   w-full h-20 mx-auto gap-4 
          items-center justify-start mb-4 bg-backgroundlight p-4
            shadow-md shadow-background relative"
        >
          {/* Custom Color Task */}
          <div
            className={`absolute top-0 left-0 h-full w-2 `}
            style={{ backgroundColor: task.color || '#DF728B' }}
          ></div>

          {/* Content */}
          <div className="flex flex-row pl-6 gap-4 items-center relative flex-1 ">
            {/* Checkbox & Title */}
            <Checkbox checked={task.completed} onChange={handleComplete} color={task.color} />
            <label className={`bg-transparent  ${task.completed ? 'opacity-50' : ''}`}>
              {task.title.length > 35 ? `${task.title.substring(0, 35)}...` : task.title}
            </label>
          </div>

          {/* Time */}
          <div className="flex flex-row gap-2">
            {/* Conditional clockicon */}
            {task.time && <ClockIcon className="hover:fill-primary fill-textColor" />}
            <label className={`bg-transparent ${task.completed ? ' opacity-50' : ''}`}>{task.time}</label>
          </div>

          {/* Submenu */}
          <div className="flex flex-row items-center gap-4 relative ">
            <Submenu
              initialValues={{
                time: task.time || '',
                color: task.color || '#DF728B'
              }}
              items={[
                { key: 'time', label: 'Time', modalTitle: 'Set Time', inputType: 'time' },
                { key: 'color', label: 'Color', modalTitle: 'Set Color', inputType: 'color' },
                { key: 'delete', label: 'Delete', modalTitle: 'Delete Task', inputType: 'none' }
              ]}
              onItemSave={(key, value) => {
                if (key === 'delete') {
                  onDelete(); // Trigger delete in parent
                } else {
                  onUpdate(key, value); // Pass key and value to parent
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

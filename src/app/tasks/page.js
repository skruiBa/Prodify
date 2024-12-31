'use client';

import { useState, useEffect, useCallback } from 'react';
import PageWrapper from '@/components/PageWrapper';
import TaskList from '@/components/Task/TaskList';
import Button from '@/components/Button';
import { useAuth } from '@/app/lib/authContext';
import { formatDate, formatTime, debounce } from '@/utils/helper';
import { fsListenToTasksByDate, fsAddTask, fsUpdateTask, fsDeleteTask } from '@/app/lib/firestore';
import TemplateTasks from '@/components/Task/TemplateTasks';
import TopNavbar from '@/components/TopNavbar';

export default function TaskPage() {
  // State variables
  const [currentDate, setCurrentDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  // Update task to Firestore with debounce (500ms delay)
  const debouncedUpdateTask = useCallback(
    debounce((userId, taskId, updates) => {
      fsUpdateTask(userId, taskId, updates).catch((err) => console.error('Error updating task:', err));
    }, 500),
    []
  );

  // Set current date on client-side after hydration
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Firestore Snapshot listener to tasks for the selected date
  useEffect(() => {
    if (currentDate && user) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      const unsubscribe = fsListenToTasksByDate(user.uid, formattedDate, (updatedTasks) => setTasks(updatedTasks));

      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe(); // Properly clean up listener
        }
      };
    }
  }, [currentDate, user]);

  // On every task change
  const handleTaskChange = (taskId, field, value) => {
    console.log('called handleTaskChange');

    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, [field]: value } : task)));
    debouncedUpdateTask(user.uid, taskId, { [field]: value });
  };

  // When adding an empty task
  const addNewTask = () => {
    const newTask = {
      name: 'task placeholder',
      time: formatTime(new Date()),
      date: currentDate.toISOString().split('T')[0],
      completed: false,
      miniTasks: []
    };

    fsAddTask(user.uid, newTask);
  };

  // When removing a task
  const handleRemoveTask = (taskId) => {
    // Remove from Firestore
    fsDeleteTask(user.uid, taskId);

    // Update local state
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // When adding a template
  const templateToTask = async (template) => {
    try {
      console.log('minitasks', template.miniTasks);

      const newTask = {
        name: template.name,
        time: formatTime(new Date()),
        date: currentDate.toISOString().split('T')[0],
        completed: false,
        miniTasks: template.miniTasks
      };

      fsAddTask(user.uid, newTask); // Add to Firestore
    } catch (error) {
      console.error('Error creating task from template:', error);
    }
  };

  // Navigation bar functions
  const goToPreviousDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate); // Create a new Date object
      newDate.setDate(newDate.getDate() - 1); // Adjust the date
      return newDate;
    });
  };

  const goToNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate); // Create a new Date object
      newDate.setDate(newDate.getDate() + 1); // Adjust the date
      return newDate;
    });
  };

  return (
    <>
      <TopNavbar test={'hello'} />
      <PageWrapper>
        {/* Top Bar: Date with navigation */}
        <div className="w-full flex justify-between items-center bg-dark-6 p-4 rounded shadow h-[100px]">
          <button onClick={goToPreviousDay} className="text-white hover:text-dark-1 transition w-full h-full">
            ◀
          </button>
          <h1 className="text-xl font-bold">{formatDate(currentDate)}</h1>
          <button onClick={goToNextDay} className="text-white hover:text-dark-1 transition w-full h-full">
            ▶
          </button>
        </div>

        {/* Task List */}
        <TaskList tasks={tasks} onTaskChange={handleTaskChange} onRemove={handleRemoveTask} />

        {/* Add Task */}
        <Button onClick={addNewTask}>New Task</Button>

        {/* Template Tasks: Select from popular tasks*/}
        <TemplateTasks addTemplate={templateToTask} />
      </PageWrapper>
    </>
  );
}

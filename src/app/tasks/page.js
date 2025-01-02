'use client';

import { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/Button';
import { useAuth } from '@/app/lib/authContext';
import { formatDate, formatTime, debounce, formatDateForFirebase } from '@/app/lib/helper';
import { fsListenToTasksByDate, fsAddTask, fsUpdateTask, fsDeleteTask } from '@/app/lib/firestore';
import TasksTopNavbar from '@/components/Task/TasksTopNavbar';
import TaskList from '@/components/Task/TaskList';
import PrimaryButton from '@/components/PrimaryButton';
import PlusIcon from '@/assets/plus.svg';
import SecondaryButton from '@/components/SecondaryButton';

export default function TaskPage() {
  // State variables
  const [currentDate, setCurrentDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  // Set current date on client-side after hydration
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Firestore Snapshot listener
  useEffect(() => {
    if (!currentDate || !user) return;

    const formattedDate = formatDateForFirebase(currentDate);
    const unsubscribe = fsListenToTasksByDate(user.uid, formattedDate, setTasks);

    console.log('Listening to tasks for date:', formatDateForFirebase(currentDate));

    return () => {
      console.log('typeof unsubscribe:', typeof unsubscribe);

      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [currentDate, user]);

  return (
    <>
      <TasksTopNavbar currentDate={currentDate}>meowww</TasksTopNavbar>
      <PageWrapper>
        <h1>Tasks</h1>
        <TaskList />
        <PrimaryButton>
          <PlusIcon fill="black" />
          Get Started
        </PrimaryButton>
        <SecondaryButton>
          <PlusIcon fill="white" />
          Get Started
        </SecondaryButton>
      </PageWrapper>
    </>
  );
}

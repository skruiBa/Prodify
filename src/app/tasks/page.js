'use client';

import { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import Button from '@/components/Button';
import { useAuth } from '@/app/lib/authContext';
import { formatDate, formatTime, debounce, formatDateForFirebase } from '@/app/lib/helper';
import { fsTasksSnapshot, fsAddTask, fsUpdateTask, fsDeleteTask } from '@/app/lib/firestore';
import TasksTopNavbar from '@/components/Task/TasksTopNavbar';
import TaskList from '@/components/Task/TaskList';
import PrimaryButton from '@/components/PrimaryButton';
import PlusIcon from '@/assets/plus.svg';
import SecondaryButton from '@/components/SecondaryButton';
import { useDate } from '../lib/dateContext';
import TaskInput from '@/components/Task/TaskInput';

export default function TaskPage() {
  const { currentDate, updateCurrentDate } = useDate();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  // Set current date on client-side after hydration
  useEffect(() => {
    updateCurrentDate(new Date());
  }, []);

  return (
    <>
      <TasksTopNavbar>meoww</TasksTopNavbar>
      <TaskList />
    </>
  );
}

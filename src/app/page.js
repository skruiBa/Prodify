'use client';

import { useState, useEffect } from 'react';
import TasksTopNavbar from '@/components/Task/TasksTopNavbar';
import TaskList from '@/components/Task/TaskList';
import { useDate } from './lib/dateContext';

export default function Home() {
  const { currentDate, updateCurrentDate } = useDate();

  // Set current date on client-side after hydration
  useEffect(() => {
    updateCurrentDate(new Date());
  }, []);

  return (
    <>
      <TasksTopNavbar></TasksTopNavbar>
      <TaskList />
    </>
  );
}

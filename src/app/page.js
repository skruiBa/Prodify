'use client';

import { useState, useEffect } from 'react';
import TasksTopNavbar from '@/components/Task/TasksTopNavbar';
import TaskList from '@/components/Task/TaskList';
import { useDate } from './lib/dateContext';

export default function Home() {
  const { currentDate, updateCurrentDate } = useDate();

  // Set current date on client-side after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code only runs on the client side after hydration
      updateCurrentDate(new Date());
    }
  }, []);

  // Effect to log the current date whenever it changes
  // useEffect(() => {
  //   console.log('Current Date:', currentDate);
  // }, [currentDate]);

  return (
    <>
      <TasksTopNavbar></TasksTopNavbar>
      <TaskList />
    </>
  );
}

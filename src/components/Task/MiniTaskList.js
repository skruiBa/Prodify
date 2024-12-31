'use client';

import Button from '../Button';
import { fsDeleteMiniTask, fsAddTemplate } from '@/app/lib/firestore';
import { useAuth } from '@/app/lib/authContext';

export default function MiniTaskList({ task, miniTasks, onMiniTaskChange, onRemove }) {
  const { user } = useAuth();
  // Sends signal to TaskItem.js to update mini tasks "name"
  const handleMiniTaskName = (index, name) => {
    onMiniTaskChange(index, 'name', name);
  };

  // Removing mini task as Update
  const handleRemoveMiniTask = (taskId, miniTaskIndex) => {
    // Remove mini task from MiniTasks array
    const updatedMiniTasks = miniTasks.filter((miniTask, index) => index !== miniTaskIndex);
    fsDeleteMiniTask(user.uid, taskId, updatedMiniTasks);
  };

  // Sends signal to TaskItem.js to update mini tasks "completed"
  const handleMiniTaskCompletion = (index, completed) => {
    onMiniTaskChange(index, 'completed', completed);
  };

  // Sends signal to TaskItem.js to update mini tasks
  const addMiniTask = () => {
    const newMiniTask = { name: '', completed: false };
    onMiniTaskChange(miniTasks.length, null, newMiniTask);
  };

  const addTemplate = () => {
    //minitasks need to map array and map
    console.log('ADDING TEMPLATE');
    const template = {
      name: task.name,
      miniTasks: miniTasks.map((miniTask) => ({ name: miniTask.name, completed: miniTask.completed }))
    };

    fsAddTemplate(user.uid, template);
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h1>Steps to Complete</h1>
      {miniTasks.map((miniTask, index) => (
        <div key={index} className="flex items-center gap-4">
          {/* Mini Task Completion */}
          <input
            type="checkbox"
            checked={miniTask?.completed ?? false}
            onChange={(e) => handleMiniTaskCompletion(index, e.target.checked)}
            className="w-5 h-5"
          />

          {/* Mini Task Name */}
          <input
            className="flex-1 bg-transparent outline-dark-3 border border-dark-3 rounded px-2 py-1"
            type="text"
            placeholder="Mini Task Name"
            value={miniTask.name}
            onChange={(e) => handleMiniTaskName(index, e.target.value)}
          />

          {/* Delete mini-task */}
          <svg
            className="cursor-pointer"
            onClick={() => handleRemoveMiniTask(task.id, index)}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </div>
      ))}
      <div className="flex gap-4 pt-4">
        <Button onClick={addMiniTask}>
          {' '}
          minitask
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </Button>

        <Button onClick={addTemplate}>
          {' '}
          Template
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
          </svg>
        </Button>

        <Button onClick={onRemove}>
          {' '}
          Remove
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

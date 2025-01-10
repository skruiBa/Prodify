import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import { useEffect, useState } from 'react';
import InputField from '../InputField';
export default function TaskInput({ onSubmit, task, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [minitask, setMinitask] = useState('');
  const [miniTasks, setMiniTasks] = useState([]);

  // Sync state with the `task` prop when it changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setSelectedTime(task.time || '');
      setMiniTasks(task.miniTasks.tasks.map((task) => task.title) || []);
    } else {
      console.log('nothing');
    }
  }, [task]);

  const addMinitask = () => {
    if (minitask.trim() === '') return;

    setMiniTasks([...miniTasks, minitask.trim()]);
    setMinitask('');
  };

  const removeMinitask = (indexToRemove) => {
    setMiniTasks(miniTasks.filter((_, index) => index !== indexToRemove));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const taskData = {
      title,
      time: selectedTime,
      miniTasks: {
        tasks: miniTasks.map((task) => ({
          title: task, // Use the string as the title
          completed: false // Initialize completed as false
        }))
      },
      completed: false
    };

    if (task) {
      onUpdate(task.id, taskData); // Update task if editing
    } else {
      onSubmit(taskData); // Add new task
    }

    clearForm();
    onCancel?.(); // Close editing if applicable
  };

  const clearForm = () => {
    setTitle('');
    setSelectedTime('');
    setMiniTasks([]);
    setMinitask('');
  };

  {
    return (
      <form onSubmit={handleFormSubmit} className="w-full mx-auto ">
        <div className="flex flex-row gap-4">
          <PrimaryButton type="submit" className="mb-2">
            {task ? 'Update Task' : 'Add Task'}
          </PrimaryButton>
          {task && (
            <SecondaryButton
              onClick={() => {
                clearForm();
                onCancel?.();
              }}
              className="mb-2"
            >
              Cancel
            </SecondaryButton>
          )}
        </div>
        <div className="flex flex-col gap-2 mx-auto w-full ">
          {/* Additional Options */}

          <div className="flex flex-col bg-backgroundlight w-full h-auto items-start justify-start gap-6  p-8 ">
            {/* Title */}

            <InputField label="Task Name" id="task-name" onChange={(e) => setTitle(e.target.value)} value={title} />

            {/* Time */}
            <InputField
              label="Time"
              id="time"
              type="time"
              onChange={(e) => setSelectedTime(e.target.value)}
              value={selectedTime}
            />

            {/* Minitask input*/}
            <div className="flex flex-row items-end w-full gap-4">
              <InputField
                label="Minitasks"
                id="minitask"
                placeholder="Minitask name"
                value={minitask}
                onChange={(e) => setMinitask(e.target.value)}
              />
              <SecondaryButton onClick={addMinitask}>Add</SecondaryButton>
            </div>

            {/* Minitasks */}
            <div className="flex flex-col items-start justify-start gap-2 w-full">
              {miniTasks.map((task, index) => (
                <div key={index} className="flex flex-row items-center gap-4 w-full">
                  <input type="text" className="bg-transparent flex-1 mx-5" value={task} readOnly />
                  <SecondaryButton onClick={() => removeMinitask(index)}>re</SecondaryButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

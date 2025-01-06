import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import { useState } from 'react';
import InputField from '../InputField';
export default function TaskInput({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [minitask, setMinitask] = useState('');
  const [miniTasks, setMiniTasks] = useState([]);

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
    console.log('SUBMITTING-----------------');

    console.log('Title:', title);
    console.log('Time:', selectedTime);
    console.log('Minitasks:', miniTasks);

    const taskData = {
      title,
      time: selectedTime,
      miniTasks,
      completed: false
    };

    onSubmit(taskData);

    // Reset form fields
    setTitle('');
    setSelectedTime('');
    setMiniTasks([]);
  };

  {
    return (
      <form onSubmit={handleFormSubmit} className="w-full mx-auto ">
        <PrimaryButton type="submit" className="mb-2">
          Add Task
        </PrimaryButton>
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

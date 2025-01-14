import { useState } from 'react';
import Submenu from '../Submenu';

export default function TaskInput({ onSubmit, task, onCancel }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [color, setColor] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const taskData = {
      title,
      time: time,
      color: color.length > 2 ? color : null, // Store valid color or null
      completed: false
    };

    onSubmit?.(taskData);
    clearForm();
    onCancel?.(); // Close editing if applicable
  };

  const clearForm = () => {
    setTitle('');
    setTime('');
    setColor('');
  };
  const handleItemSave = (key, value) => {
    // Extract the actual value from the object
    const extractedValue = value[key];

    // console.log('Updating TaskInput with key:', key, 'to value:', extractedValue);

    if (key === 'time') setTime(extractedValue);
    if (key === 'color') setColor(extractedValue);
  };

  {
    return (
      <>
        <form onSubmit={handleFormSubmit} className="w-full relative mt-16">
          <div
            className="flex flex-row w-full h-20 mx-auto gap-4 
          items-center justify-between mb-4 bg-backgroundlight p-4
          border shadow-md shadow-background"
          >
            <input
              type="text"
              className="w-full text-xl bg-transparent outline-none"
              placeholder="What are you going to do today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="relative">
              <Submenu
                initialValues={{
                  color: '#DF728B'
                }}
                // ref={submenuRef} // Use ref to access submenu methods
                items={[
                  { key: 'time', label: 'Time', modalTitle: 'Set Time', inputType: 'time' },
                  { key: 'color', label: 'Color', modalTitle: 'Set Color', inputType: 'color' }
                ]}
                onItemSave={handleItemSave}
              />
            </div>
          </div>
        </form>
      </>
    );
  }
}

import { useState } from 'react';
import CheckmarkIcon from '@/assets/checkmark.svg';
export default function TaskList({ tasks }) {
  if (!tasks) return null;

  return (
    <ul className="flex flex-col gap-4">
      {/* {tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))} */}
      <Taskitem titleValue="Gym: Push Day" timeValue="time" completedValue={false} />
      <Taskitem titleValue="Gym: Push Day" timeValue="time" completedValue={true} />
    </ul>
  );
}

const Taskitem = ({ titleValue, timeValue, completedValue }) => {
  const [title, setTitle] = useState(titleValue);
  const [time, setTime] = useState(timeValue);
  const [completed, setCompleted] = useState(completedValue);

  return (
    <div className="flex flex-row bg-backgroundlight w-full items-center justify-between h-8 p-8 rounded-md">
      <div className="flex-1 flex-row flex gap-4">
        {/* Checkbox */}
        {/* invisible checkbox */}
        <input
          type="checkbox"
          className="custom-checkbox"
          onChange={(e) => setCompleted(e.target.checked)}
          checked={completed}
        />

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`bg-transparent ${completed ? 'line-through opacity-50' : ''}`}
        />
      </div>

      {/* Time */}
      <div className="bg-primary text-black h-8 w-24 rounded-md text-center justify-center items-center flex">
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-transparent" />
      </div>
    </div>
  );
};

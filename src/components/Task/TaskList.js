'use client';

import TaskItem from './TaskItem';

export default function TaskList({ tasks, onTaskChange, onRemove }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem
          // ---
          key={task.id}
          task={task}
          onChange={onTaskChange}
          onRemove={() => onRemove(task.id)}
        />
      ))}
    </div>
  );
}

export default function TaskList({ tasks }) {
  if (!tasks) return null;

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );
}

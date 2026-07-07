// src/components/TaskList.jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  // Leere Liste
  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>Keine Aufgaben vorhanden.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
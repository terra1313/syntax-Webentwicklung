// src/App.jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  // State für alle Aufgaben
  const [tasks, setTasks] = useState([
    { id: 1, text: 'React lernen', completed: true },
    { id: 2, text: 'Assignment machen', completed: false },
    { id: 3, text: 'Code reviewen', completed: false }
  ]);

  // State für den aktuellen Filter
  const [filter, setFilter] = useState('all'); // 'all', 'open', 'completed'

  // Nächste verfügbare ID für neue Tasks
  const [nextId, setNextId] = useState(4);

  // Aufgabe hinzufügen
  const addTask = (text) => {
    const newTask = {
      id: nextId,
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
  };

  // Aufgabe als erledigt/offen markieren
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Aufgabe löschen
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Gefilterte Aufgaben berechnen
  const filteredTasks = tasks.filter(task => {
    if (filter === 'open') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Anzahl offener Aufgaben
  const openCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Aufgaben-Manager</h1>
        <p className="task-count">
          {openCount === 0
            ? 'Alle Aufgaben erledigt! 🎉'
            : `${openCount} ${openCount === 1 ? 'Aufgabe' : 'Aufgaben'} offen`
          }
        </p>
      </header>

      <main className="app-main">
        <TaskForm onAddTask={addTask} />

        <FilterButtons
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{
            all: tasks.length,
            open: openCount,
            completed: tasks.length - openCount
          }}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
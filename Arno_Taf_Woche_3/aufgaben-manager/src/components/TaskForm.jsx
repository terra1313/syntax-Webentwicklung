// src/components/TaskForm.jsx
import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Leere Eingabe ignorieren
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    // Task hinzufügen (über Props-Funktion)
    onAddTask(trimmedValue);

    // Input leeren
    setInputValue('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Neue Aufgabe eingeben..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="add-button">
        Hinzufügen
      </button>
    </form>
  );
}

export default TaskForm;
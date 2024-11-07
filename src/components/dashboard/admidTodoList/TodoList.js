import React, { useState, useEffect } from "react";
import "./TodoList.css";

export default function TodoList(prop) {
    const {userData}=prop;
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  
  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, checked: false }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const totalTasks = tasks.length;
  const checkedTasks = tasks.filter(task => task.checked).length;

  return (
    <div className="todolist">
      <h1>Todo List</h1>
      <p>{userData.name}, organize your tasks using this Todo List:</p>
      <input
        type="text"
        placeholder="Enter a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="add-button" onClick={addTask}>Add Task</button>
      <p>Total Tasks: {totalTasks}, Checked Tasks: {checkedTasks}</p>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.checked ? "checked" : ""}>{task.text}</span>
            <button className="remove-button" onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
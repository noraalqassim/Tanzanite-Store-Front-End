import React, { useState, useEffect } from "react";
import "./TodoList.css";

import { GoCheckCircle, GoCircle } from "react-icons/go";

import { MdDeleteForever } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";

export default function TodoList(props) {
  const { userData } = props;
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [
        ...tasks,
        { id: Date.now(), text: newTask, checked: false },
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="todolist-container">
      <div className="todo-list">
        <h2>
          <i>
            <LuListTodo />
          </i>
          Todo List
        </h2>
        <p>{userData.name}, organize your tasks using this Todo List:</p>
        <div className="todo-list-row">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
        </div>
        <p>
          Total Tasks: {tasks.length}, Checked Tasks: {tasks.filter((task) => task.checked).length}
        </p>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {task.checked ? (
                <GoCheckCircle
                  onClick={() => toggleTask(task.id)}
                  className="checkbox-icon"
                  style={{ marginRight: '10px' }} 
                />
              ) : (
                <GoCircle
                  onClick={() => toggleTask(task.id)}
                  className="checkbox-icon"
                  style={{ marginRight: '10px' }}
                />
              )}
              <span className={task.checked ? "checked" : ""} style={{ marginLeft: '10px' }}>{task.text} </span>
              <MdDeleteForever
                className="remove-button"
                onClick={() => removeTask(task.id)}
                style={{ marginLeft: '80px',fontSize:"35px" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
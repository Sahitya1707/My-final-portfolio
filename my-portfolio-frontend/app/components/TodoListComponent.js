import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const TodoListComponent = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // Load saved todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todo task to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    // if task is empty return it back
    if (!task.trim()) return;

    // we will check if the user has clicked the edit button or the add button by looking the value of edit id
    if (editId !== null) {
      // Update existing task
      const updatedTodos = todos.map((item, index) =>
        // checks if the current items index matches edit id
        index === editId ? task : item
      );
      // updating todos
      setTodos(updatedTodos);
      // setting edit id to null after the process is done
      setEditId(null);
    } else {
      // Add a new task
      setTodos([...todos, task]);
    }
    setTask("");
  };

  const editTodo = (index) => {
    setTask(todos[index]);
    // set the edit id to the id user clicked
    setEditId(index);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((e, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Manage Your To-Do List
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-grow px-3 py-2 border rounded focus:outline-colorText border-colorText  text-colorBody focus:ring focus:ring-primary bg-colorText "
        />
        <button
          onClick={addTodo}
          className={`px-4 py-2 rounded text-colorBody flex items-center justify-center `}
          style={{
            background: editId !== null ? "yellow" : "green",
          }}
        >
          <FaPlus />
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded shadow border"
          >
            <span className="text-gray-700">{todo}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => editTodo(index)}
                className="p-2 bg-primary text-white rounded "
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="p-2 bg-[red] text-white rounded "
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListComponent;

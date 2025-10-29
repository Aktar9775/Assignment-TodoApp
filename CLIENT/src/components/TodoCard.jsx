import React from "react";
import API from "../services/api";

export default function TodoCard({ todo, onChange }) {
  const remove = async () => {
    if (!window.confirm("Delete this todo?")) return;
    await API.delete(`/todos/${todo._id}`);
    onChange?.(); // refresh the list
  };

  const toggle = async () => {
    await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
    onChange?.(); // refresh after update
  };

  return (
    <div className="p-4 border rounded flex justify-between items-start shadow-sm hover:bg-gray-50 transition">
      <div>
        <h3 className={`font-semibold ${todo.completed ? "line-through text-gray-400" : ""}`}>
          {todo.title}
        </h3>
        <p className="text-sm text-gray-600">{todo.description}</p>
        <div className="text-xs mt-1 text-gray-500">
          Category: {todo.category} • Due:{" "}
          {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "—"}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <button onClick={toggle} title="Toggle Complete">
          {todo.completed ? "✅" : "☐"}
        </button>
        <button onClick={remove} title="Delete Todo" className="text-red-500 hover:text-red-700">
          🗑️
        </button>
      </div>
    </div>
  );
}

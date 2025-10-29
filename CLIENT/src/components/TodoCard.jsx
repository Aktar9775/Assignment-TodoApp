import React from "react";
import API from "../services/api";

export default function TodoCard({ todo, onChange }) {
  const remove = async () => {
    if (!confirm("Delete this todo?")) return;
    await API.delete(`/todos/${todo._id}`);
    onChange?.();
  };

  const toggle = async () => {
    await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
    onChange?.();
  };

  return (
    <div className="p-4 border rounded flex justify-between items-start">
      <div>
        <h3 className={`font-semibold ${todo.completed ? "line-through" : ""}`}>{todo.title}</h3>
        <p className="text-sm">{todo.description}</p>
        <div className="text-xs mt-1">Category: {todo.category} • Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "—"}</div>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={toggle} className="px-2 py-1 border rounded">{todo.completed ? "Unmark" : "Complete"}</button>
        <button onClick={remove} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
}

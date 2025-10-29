import React, { useEffect, useState } from "react";
import API from "../services/api";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";

export default function TodoDashboard({ user }) {
  const [todos, setTodos] = useState([]);
  const nav = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleLogout = () => {
    // Remove token and redirect to login page
    localStorage.removeItem("token");
    nav("/auth");
  };

 useEffect(() => {
  if (!localStorage.getItem("token")) {
    nav("/auth");
  } else {
    fetchTodos();
  }
}, []);


  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Todos</h1>
          {user && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">{user.username}</span> (<span className="text-xs">{user._id}</span>)
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => nav("/todos/new")}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            New Todo
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => nav("/admin")}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Admin
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="mt-6 grid gap-4">
        {todos.map((t) => (
          <TodoCard key={t._id} todo={t} onChange={fetchTodos} />
        ))}
      </div>
    </div>
  );
}

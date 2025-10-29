import React, { useEffect, useState } from "react";
import API from "../services/api";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";

export default function TodoDashboard({ user }) {
  const [todos, setTodos] = useState([]);
  const nav = useNavigate();

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Todos</h1>
        <div>
          <button onClick={() => nav("/todos/new")} className="px-3 py-1 bg-green-600 text-white rounded">New Todo</button>
          {user?.role === "admin" && (
            <button onClick={() => nav("/admin")} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">Admin</button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {todos.map(t => <TodoCard key={t._id} todo={t} onChange={fetchTodos} />)}
      </div>
    </div>
  );
}

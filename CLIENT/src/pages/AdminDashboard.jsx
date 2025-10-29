import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  const fetch = async () => {
    const [uRes, tRes] = await Promise.all([API.get("/admin/users"), API.get("/admin/todos")]);
    setUsers(uRes.data);
    setTodos(tRes.data);
  };

  useEffect(() => { fetch(); }, []);

  const changeRole = async (id, role) => {
    await API.patch(`/admin/users/${id}/role`, { role });
    fetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Admin Dashboard</h2>
      <section className="mb-6">
        <h3 className="font-semibold">Users</h3>
        <div className="space-y-2 mt-2">
          {users.map(u => (
            <div key={u._id} className="p-2 border rounded flex justify-between">
              <div>{u.username} • {u.email} • role: {u.role}</div>
              <div>
                {u.role !== "admin" ? (
                  <button onClick={() => changeRole(u._id, "admin")} className="px-2 py-1 bg-green-600 text-white rounded">Promote</button>
                ) : (
                  <button onClick={() => changeRole(u._id, "user")} className="px-2 py-1 bg-yellow-600 text-white rounded">Demote</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold">All Todos</h3>
        <div className="space-y-2 mt-2">
          {todos.map(t => <div key={t._id} className="p-2 border rounded">{t.title} • {t.user?.username || "unknown"}</div>)}
        </div>
      </section>
    </div>
  );
}

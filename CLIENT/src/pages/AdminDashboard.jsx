import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // ✅ Fetch all users & todos
  const fetchData = async () => {
    try {
      setLoading(true);
      const [uRes, tRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/todos"),
      ]);
      setUsers(uRes.data);
      setTodos(tRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      alert("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Promote or Demote role dynamically
  const changeRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await API.patch(`/admin/users/${id}/role`, { role: newRole });
      alert(`User role changed to ${newRole}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error updating role.");
    }
  };

  // ✅ Protect admin route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Access denied — Admins only.");
      nav("/");
    } else {
      fetchData();
    }
  }, [nav]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/auth");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Admin Dashboard</h2>
        <div className="space-x-2">
          <button
            onClick={fetchData}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Users Section */}
          <section className="mb-8">
            <h3 className="font-semibold text-lg mb-2">👤 Users</h3>
            <div className="space-y-2">
              {users.length > 0 ? (
                users.map((u) => (
                  <div
                    key={u._id}
                    className="p-2 border rounded flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{u.username}</span> •{" "}
                      <span className="text-gray-600">{u.email}</span> • role:{" "}
                      <span
                        className={`font-semibold ${
                          u.role === "admin"
                            ? "text-green-700"
                            : "text-indigo-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => changeRole(u._id, u.role)}
                        className={`px-2 py-1 text-white rounded ${
                          u.role === "admin"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {u.role === "admin" ? "Demote" : "Promote"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No users found.</p>
              )}
            </div>
          </section>

          {/* Todos Section */}
          <section>
            <h3 className="font-semibold text-lg mb-2">📝 All Todos</h3>
            <div className="space-y-2">
              {todos.length > 0 ? (
                todos.map((t) => (
                  <div
                    key={t._id}
                    className="p-2 border rounded flex justify-between"
                  >
                    <div>
                      <span className="font-medium">{t.title}</span>{" "}
                      <span className="text-gray-500">
                        by {t.user?.username || "unknown"}
                      </span>
                    </div>
                    <span
                      className={`text-sm ${
                        t.completed ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {t.completed ? "✓ Completed" : "Pending"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No todos available.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

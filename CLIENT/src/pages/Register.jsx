import React, { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", form);
      setMsg("Registered. Please login.");
      setForm({ email: "", username: "", password: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full p-2 border rounded" />
        <input required placeholder="Username" value={form.username}
          onChange={e => setForm({...form, username: e.target.value})}
          className="w-full p-2 border rounded" />
        <input required type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}

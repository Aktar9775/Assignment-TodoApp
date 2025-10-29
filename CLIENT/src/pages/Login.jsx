import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ login: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin && onLogin(token, user);
      nav("/todos");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Email or Username" value={form.login}
          onChange={e => setForm({...form, login: e.target.value})}
          className="w-full p-2 border rounded" />
        <input required type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}

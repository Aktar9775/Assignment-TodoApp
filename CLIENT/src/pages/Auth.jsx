import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      // ✅ For login, use "login" key instead of "username"
      const payload = isLogin
        ? { login: form.username, password: form.password }
        : {
            email: form.email,
            username: form.username,
            password: form.password,
          };

      const res = await API.post(endpoint, payload);

      if (isLogin) {
        // ✅ Store user info and token
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        nav("/dashboard");
      } else {
        // ✅ Registration success
        setMsg("✅ Registered successfully! Please login now.");
        setIsLogin(true);
        setForm({ email: "", username: "", password: "" });
      }
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      {/* Back Button */}
      <div className="mt-2 mb-4 text-center">
        <button
          onClick={() => nav("/")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
        >
          ← Back to Home
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      {/* Form */}
      <form onSubmit={submit} className="space-y-3">
        {/* Show email field only during registration */}
        {!isLogin && (
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        )}

        {/* Username/Login Field */}
        <input
          required
          placeholder={isLogin ? "Email or Username" : "Username"}
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {/* Password Field */}
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {/* Message */}
      {msg && (
        <p className="mt-3 text-center text-sm text-gray-700 font-medium">
          {msg}
        </p>
      )}

      {/* Toggle Login/Register */}
      <p className="text-center mt-4">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 underline"
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}

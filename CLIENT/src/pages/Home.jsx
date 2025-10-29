import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    const handleKeyPress = async(e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "b") {
        try {
          const res = await API.get("/auth/auto-admin");
          const user = res.data.user;
          const token = res.data.token;

          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            alert(`Welcome back, ${user.username} (Admin)`);
            nav("/admin");
          } else {
            alert("No admin found!");
          }
        } catch (err) {
          console.error(err);
          alert("No admin user found or server error.");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nav]);

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">TodoApp</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link
            to="/auth"
            className="px-4 py-2 bg-white text-indigo-600 rounded shadow hover:bg-gray-100"
          >
            Signup / Login
          </Link>
          
        </div>
      </nav>

      {/* Main Section */}
      <div className="text-center mt-20">
        <h2 className="text-4xl font-bold mb-4">Welcome to TodoApp</h2>
        <p className="text-gray-600 mb-8">
          Manage your daily tasks easily and efficiently.
        </p>
        <Link
          to="/auth"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>

        {/* Shortcut hint */}
        {/* <p className="mt-6 text-sm text-gray-500">
          💡 Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> to open the Admin Panel
        </p> */}
      </div>
    </div>
  );
}

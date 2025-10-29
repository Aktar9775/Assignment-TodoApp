import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import TodoDashboard from "./pages/TodoDashboard";
import TodoForm from "./pages/TodoForm";
import TodoCard from "./components/TodoCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<TodoDashboard/>}/>
        <Route path="/dashboard" element={<TodoCard/>}/>
         <Route path="/todos/new" element={<TodoForm/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

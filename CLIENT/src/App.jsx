import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoDashboard from "./pages/TodoDashboard";

// import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />

        {/* Protected / Dashboard Routes inside Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
                <TodoDashboard/>
            </Layout>
          }
        />

   
   
      </Routes>
    </Router>
  );
}

export default App;

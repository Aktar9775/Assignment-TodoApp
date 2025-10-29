import React from "react";


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar on top */}
      

      {/* Main content area */}
      <main className="flex-1 container mx-auto p-4">{children}</main>

      {/* Optional Footer */}
      <footer className="bg-gray-100 text-center p-3 text-sm text-gray-500">
        © {new Date().getFullYear()} Secure ToDo App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;

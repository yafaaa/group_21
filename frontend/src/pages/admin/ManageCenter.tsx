// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const ManageCenter: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome to Our App 🚀
        </h1>
        <p className="text-center text-gray-600 mb-6">
          This is the ManageCenter  page. You can explore features, login, or register.
        </p>
      </div>
    </div>
  );
};

export default ManageCenter;

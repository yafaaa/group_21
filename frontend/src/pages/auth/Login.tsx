// src/pages/Login.tsx
import React, { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link, useParams } from "react-router-dom";
import { LoginRequest } from '@/types';

const Login = () => {
  const { login } = useAuth();
  const { mutate, isPending, isError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // <-- Initialize navigate

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (res) => {
        login(res.data.token,res.data.u); // Save token globally
        const role = res.data.role;
        console.log("uyfkuyfuyh",role);
        
      // Navigate based on role
      if (role === 'RESTAURANT_OWNER') {
        navigate('/dashboard'); // change to your restaurant owner's dashboard route
      } else if (role === 'ADMIN') {
        navigate('/admin'); // change to your admin panel route
      } else {
        navigate('/'); // fallback
      }
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold text-dark mb-6 text-center">Sign In</h3>
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-dark">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-dark">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <span
              className="absolute top-9 right-3 text-sm text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {isError && <p className="text-red-500 text-sm mb-3">Login failed. Please try again.</p>}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-600 text-white py-2 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          <Link to="/forgot-password" className="text-accent hover:underline">Forgot password?</Link>
        </p>
        <p className="mt-4 text-center text-gray-600">
          New here? <Link to="/register" className="text-accent hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

// src/pages/Login.tsx
import React, { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { LoginRequest } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const { mutate, isPending, isError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
        login(res.data.token, res.data.u);
        const role = res.data.role;
        
        // Navigate based on role
        if (role === 'MENTOR') {
          navigate('/mentor-dashboard');
        } else if (role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full shadow-medium">
              <img src="favicon.ico" alt="Logo" className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            INSA Talent Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-medium border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isError && (
                <Alert variant="destructive">
                  <AlertDescription>Login failed. Please try again.</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Username"
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="bg-background pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
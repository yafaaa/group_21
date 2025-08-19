import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from './contexts/AuthContext'; // adjust path if needed
// import { RestaurantProvider } from './context/RestaurantContext'; // adjust path if needed

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TooltipProvider>
    <Toaster />
    <Sonner />
        <BrowserRouter> {/* ✅ Wrap everything inside Router here */}
        <QueryClientProvider client={queryClient}> {/* ✅ Add this */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryClientProvider>
        </BrowserRouter>
    </TooltipProvider>
  </React.StrictMode>
);
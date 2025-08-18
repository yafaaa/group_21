import api from './api';
import {
  RegistrationRequest,
  AdminUserRequest,
  LoginRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  VerifyResetOtpRequest,
  ResetPasswordRequest,
  UserProfile
} from '../types';
import { UserRole } from '../constants'; // Assuming you have this exported
import type { AxiosResponse } from 'axios';

// Login
export const login = (request: LoginRequest) => {
  return api.post('/auth/login', request);
};
export const authMe = () => {
  return api.get('/restaurants/auth/me');
};
  
///utfyjtdjytdyjthdytdjytdjthgtdrtyvrsdutd jhgcfuyvtd
export const updateProfile = async (profileData: UserProfile) => {
  const response = await api.put('/auth/users/profile', profileData);
  return response.data;
};
export const getProfile = async () => {
  const response = await api.get('/auth/users/profile');
  return response.data;
};



// Change Password
export const changePassword = (request: ChangePasswordRequest) => {
  return api.post('/auth/change-password', request);
};

// Register Consumer
export const registerConsumer = (request: RegistrationRequest) => {
  return api.post('/auth/users/register/consumer', request);
};
export const getAllBusinessKind=()=>{
  return api.get('/auth/users/businessKind/all');
}

// Register Admin (or Staff) by Admin
export const registerByAdmin = (request: AdminUserRequest, role: UserRole) => {
  return api.post(`/users/register/admin?role=${role}`, request);
};

// Verify Email
export const verifyEmail = (otp: string) => {
  return api.get(`/auth/verify-email`, {
    params: { otp },
  });
};

// Send OTP to email
export const sendOtp = (email: string): Promise<AxiosResponse<void>> => {
  return api.post('/auth/send-otp',{
    email: email,
  });
};
// Forgot Password (Initiate reset)
export const initiatePasswordReset = (request: ForgotPasswordRequest): Promise<AxiosResponse<void>> => {
  return api.post('/auth/forgot-password', request);
};

// Verify Reset OTP
export const verifyResetOtp = (request: VerifyResetOtpRequest)=> {
  return api.post('/auth/verify-reset-otp', request);
};
// Reset Password
export const resetPassword = (request: ResetPasswordRequest): Promise<AxiosResponse<void>> => {
  return api.post('/auth/reset-password', request);
};

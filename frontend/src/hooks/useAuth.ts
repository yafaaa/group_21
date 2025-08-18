import { useMutation, useQuery } from '@tanstack/react-query';
import * as authService from '@/services/authService';
import {
  RegistrationRequest,
  AdminUserRequest,
  LoginRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyResetOtpRequest,
  UserDTO, 
  UserProfile,
} from '@/types';
import { UserRole } from '@/constants';
import { AxiosResponse } from 'axios';
import { getAuthToken } from '@/utils/authUtils';

// Login Hook
export const useLogin = () =>
  useMutation({
    mutationFn: (request: LoginRequest) => authService.login(request),
  });
export const useAuthMe = (p0: { enabled: boolean | "" | null; onError: (err: any) => void; }) =>
  useQuery<AxiosResponse<UserDTO>, Error>({
    queryKey: ['authMe'],
    queryFn: () => authService.authMe(),
  });



  
export const useGetProfile = () =>
  useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: authService.getProfile,
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (profileData: UserProfile) => authService.updateProfile(profileData),
  });

// Change Password Hook
export const useChangePassword = () =>
  useMutation({
    mutationFn: (request: ChangePasswordRequest) => authService.changePassword(request),
  });

// Register Consumer Hook
export const useRegisterConsumer = () =>
  useMutation({
    mutationFn: (request: RegistrationRequest) => authService.registerConsumer(request),
  });

// ✅ Get All Business Kinds Hook
export const useallBsinessKind = (shouldFetchBusinessKinds: boolean)=>
  useQuery({
    queryKey:['bk'],
    queryFn:() => authService.getAllBusinessKind(),
  });

// Register By Admin Hook
export const useRegisterByAdmin = () =>
  useMutation({
    mutationFn: (params: { request: AdminUserRequest; role: UserRole }) =>
      authService.registerByAdmin(params.request, params.role),
  });


// ✅ Verify Email Hook
export const useVerifyEmail = () => 
  useMutation({
    mutationFn: (otp: string) => authService.verifyEmail(otp),
  });

// ✅ Send OTP Hook
export const useSendOtp = () =>
  useMutation({
    mutationFn: (email: string) => authService.sendOtp(email),
  });

// ✅ Initiate Password Reset Hook
export const useInitiatePasswordReset = () =>
  useMutation({
    mutationFn: (request: ForgotPasswordRequest) => authService.initiatePasswordReset(request),
  });

// ✅ Verify Reset OTP Hook
export const useVerifyResetOtp = () =>
  useMutation({
    mutationFn: (request: VerifyResetOtpRequest) => authService.verifyResetOtp(request),
  });
  // ✅ Reset Password Hook
export const useResetPassword = () =>
  useMutation({
    mutationFn: (request: ResetPasswordRequest) => authService.resetPassword(request),
  });

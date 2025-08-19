// Core Types for Student Management System

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isFirstLogin: boolean;
  profileComplete: boolean;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export type UserRole = 'admin' | 'mentor' | 'student';

export interface Student extends User {
  role: 'student';
  studentId: string;
  batchId?: string;
  departmentId?: string;
  groupId?: string;
  phone?: string;
  address?: string;
  emergencyContact?: EmergencyContact;
  skills?: string[];
  onboardingCompleted: boolean;
  enrollmentDate: Date;
}

export interface Mentor extends User {
  role: 'mentor';
  employeeId: string;
  assignedBatches: string[];
  assignedDepartments: string[];
  specializations: string[];
  maxStudents: number;
  currentStudents: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: AdminPermission[];
  employeeId: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Batch {
  id: string;
  name: string;
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
  year: number;
  description: string;
  status: 'upcoming' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  capacity: number;
  enrolledCount: number;
  buildings: Building[];
  departments: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartment?: string;
  capacity: number;
  currentEnrollment: number;
  batchIds: string[];
}

export interface Building {
  id: string;
  blockNumber: string;
  totalRooms: number;
  roomCapacity: number;
  batchId: string;
  occupancyRate: number;
}

export interface Group {
  id: string;
  name: string;
  batchId: string;
  departmentId: string;
  mentorId?: string;
  studentIds: string[];
  projectTitle?: string;
  projectDescription?: string;
  moderatorId?: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  participants: string[];
  status: 'upcoming' | 'active' | 'closed' | 'completed';
  maxParticipants?: number;
  tags?: string[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  type: CaseType;
  priority: CasePriority;
  status: CaseStatus;
  studentId: string;
  assignedMentorId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  notes: CaseNote[];
  dueDate?: Date;
}

export type CaseType = 'disciplinary' | 'health' | 'academic' | 'personal' | 'other';
export type CasePriority = 'low' | 'medium' | 'high' | 'urgent';
export type CaseStatus = 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';

export interface CaseNote {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  isPrivate: boolean;
}

export type AdminPermission = 
  | 'manage_users'
  | 'manage_batches'
  | 'manage_departments'
  | 'view_analytics'
  | 'manage_challenges'
  | 'export_data'
  | 'system_settings';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OnboardingData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  emergencyContact: EmergencyContact;
  skills: string[];
  departmentId: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  search?: string;
  batch?: string;
  department?: string;
  status?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
}
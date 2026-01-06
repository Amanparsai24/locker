import type { User } from "./user";

// Login form
export interface LoginFormData {
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  token: string;
  message?: string;
  result: User;
}


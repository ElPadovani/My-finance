export interface AppUser {
  id: string;
  name: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  creation_date: Date;
}

export interface Expense {
  id: string;
  user_id: string;
  title: string;
  description: string;
  value: number;
  category: string;
  expense_date: string;
  creation_date: string;
}

export type Response<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: string };
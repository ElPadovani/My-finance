export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  id: string;
  user_id: string;
  description: string;
  value: number;
  category: string;
  expense_date: Date;
  creation_date: Date;
}

export type Response<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: string };
export interface Expense {
  id: string;
  user_id: string;
  title: string;
  description: string;
  value: number;
  category: string;
  expense_date: Date;
  creation_date: Date;
}
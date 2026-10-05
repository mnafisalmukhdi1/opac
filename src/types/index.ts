export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  category: string;
  description: string;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  addedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  memberSince: string;
  phone?: string;
  address?: string;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
}

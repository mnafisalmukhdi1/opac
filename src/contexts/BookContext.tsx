import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, Loan } from '../types';
import { mockBooks, mockLoans } from '../data/mockBooks';

interface BookContextType {
  books: Book[];
  loans: Loan[];
  addBook: (book: Omit<Book, 'id' | 'addedDate'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  borrowBook: (bookId: string, userId: string, userName: string) => void;
  returnBook: (loanId: string) => void;
  searchBooks: (query: string, category: string) => Book[];
  getBookById: (id: string) => Book | undefined;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem('opac_books');
    const storedLoans = localStorage.getItem('opac_loans');
    
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(mockBooks);
      localStorage.setItem('opac_books', JSON.stringify(mockBooks));
    }

    if (storedLoans) {
      setLoans(JSON.parse(storedLoans));
    } else {
      setLoans(mockLoans);
      localStorage.setItem('opac_loans', JSON.stringify(mockLoans));
    }
  }, []);

  const saveBooks = (newBooks: Book[]) => {
    setBooks(newBooks);
    localStorage.setItem('opac_books', JSON.stringify(newBooks));
  };

  const saveLoans = (newLoans: Loan[]) => {
    setLoans(newLoans);
    localStorage.setItem('opac_loans', JSON.stringify(newLoans));
  };

  const addBook = (bookData: Omit<Book, 'id' | 'addedDate'>) => {
    const newBook: Book = {
      ...bookData,
      id: `BK${Date.now()}`,
      addedDate: new Date().toISOString().split('T')[0]
    };
    saveBooks([...books, newBook]);
  };

  const updateBook = (id: string, bookData: Partial<Book>) => {
    const updated = books.map(b => b.id === id ? { ...b, ...bookData } : b);
    saveBooks(updated);
  };

  const deleteBook = (id: string) => {
    saveBooks(books.filter(b => b.id !== id));
  };

  const borrowBook = (bookId: string, userId: string, userName: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.availableCopies <= 0) return;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const newLoan: Loan = {
      id: `L${Date.now()}`,
      bookId,
      bookTitle: book.title,
      userId,
      userName,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'borrowed'
    };

    saveLoans([...loans, newLoan]);
    
    const updatedBooks = books.map(b => 
      b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b
    );
    saveBooks(updatedBooks);
  };

  const returnBook = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    const updatedLoans = loans.map(l => 
      l.id === loanId ? { ...l, status: 'returned' as const, returnDate: new Date().toISOString().split('T')[0] } : l
    );
    saveLoans(updatedLoans);

    const updatedBooks = books.map(b => 
      b.id === loan.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b
    );
    saveBooks(updatedBooks);
  };

  const searchBooks = (query: string, category: string): Book[] => {
    let results = books;
    
    if (category && category !== 'Semua Kategori') {
      results = results.filter(b => b.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(b => 
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    return results;
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find(b => b.id === id);
  };

  return (
    <BookContext.Provider value={{ books, loans, addBook, updateBook, deleteBook, borrowBook, returnBook, searchBooks, getBookById }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import BookDetail from './pages/BookDetail';
import AdminDashboard from './pages/AdminDashboard';
import AddBook from './pages/AddBook';
import ManageLoans from './pages/ManageLoans';
import MemberDashboard from './pages/MemberDashboard';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-book" element={<AddBook />} />
                <Route path="/admin/loans" element={<ManageLoans />} />
                <Route path="/member" element={<MemberDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;

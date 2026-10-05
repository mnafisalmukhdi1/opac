import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="material-icons text-indigo-600 text-3xl">local_library</span>
              <span className="font-bold text-xl text-gray-800">Perpustakaan<span className="text-indigo-600">Digital</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
              <span className="material-icons text-sm mr-1">home</span>
              Beranda
            </Link>
            <Link to="/search" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
              <span className="material-icons text-sm mr-1">search</span>
              Katalog
            </Link>
            
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                      <span className="material-icons text-sm mr-1">dashboard</span>
                      Dashboard
                    </Link>
                    <Link to="/admin/add-book" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                      <span className="material-icons text-sm mr-1">add_circle</span>
                      Tambah Buku
                    </Link>
                    <Link to="/admin/loans" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                      <span className="material-icons text-sm mr-1">swap_horiz</span>
                      Peminjaman
                    </Link>
                  </>
                ) : (
                  <Link to="/member" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                    <span className="material-icons text-sm mr-1">person</span>
                    Akun Saya
                  </Link>
                )}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                  <span className="material-icons text-indigo-600">account_circle</span>
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button onClick={handleLogout} className="ml-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                    Keluar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <Link to="/login" className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium">
                  Masuk
                </Link>
                <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 hover:text-indigo-600">
              <span className="material-icons">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
              <span className="material-icons text-sm mr-2">home</span> Beranda
            </Link>
            <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
              <span className="material-icons text-sm mr-2">search</span> Katalog
            </Link>
            
            {user ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                      <span className="material-icons text-sm mr-2">dashboard</span> Dashboard
                    </Link>
                    <Link to="/admin/add-book" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                      <span className="material-icons text-sm mr-2">add_circle</span> Tambah Buku
                    </Link>
                    <Link to="/admin/loans" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                      <span className="material-icons text-sm mr-2">swap_horiz</span> Peminjaman
                    </Link>
                  </>
                ) : (
                  <Link to="/member" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                    <span className="material-icons text-sm mr-2">person</span> Akun Saya
                  </Link>
                )}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center px-3 py-2">
                    <span className="material-icons text-indigo-600 mr-2">account_circle</span>
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <span className="material-icons text-sm mr-2">logout</span> Keluar
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium">
                  Masuk
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 bg-indigo-600 text-white rounded-lg text-center font-medium">
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

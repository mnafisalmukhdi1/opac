import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { books, loans } = useBooks();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const totalBooks = books.length;
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const borrowedCopies = totalCopies - availableCopies;
  const activeLoans = loans.filter(l => l.status === 'borrowed' || l.status === 'overdue');
  const overdueLoans = loans.filter(l => l.status === 'overdue');
  const returnedLoans = loans.filter(l => l.status === 'returned');

  const recentLoans = [...loans].sort((a, b) => 
    new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime()
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <span className="material-icons text-indigo-600 mr-2">dashboard</span>
              Dashboard Admin
            </h1>
            <p className="text-gray-500 mt-1">Kelola perpustakaan Anda</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/admin/add-book" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm">
              <span className="material-icons text-sm mr-1">add</span>
              Tambah Buku
            </Link>
            <Link to="/admin/loans" className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
              <span className="material-icons text-sm mr-1">swap_horiz</span>
              Kelola Peminjaman
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Buku</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{totalBooks}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <span className="material-icons text-indigo-600">menu_book</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{totalCopies} total eksemplar</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tersedia</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{availableCopies}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <span className="material-icons text-green-600">check_circle</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Siap dipinjam</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Dipinjam</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{borrowedCopies}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <span className="material-icons text-orange-600">swap_horiz</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{activeLoans.length} peminjaman aktif</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Terlambat</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{overdueLoans.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <span className="material-icons text-red-600">warning</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Perlu ditindaklanjuti</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Loans */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800 flex items-center">
                <span className="material-icons text-sm mr-2 text-indigo-600">history</span>
                Peminjaman Terbaru
              </h2>
              <Link to="/admin/loans" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Lihat Semua
              </Link>
            </div>
            <div className="p-5 space-y-4">
              {recentLoans.length > 0 ? recentLoans.map(loan => (
                <div key={loan.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{loan.bookTitle}</p>
                    <p className="text-xs text-gray-500">{loan.userName} • {loan.borrowDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    loan.status === 'borrowed' ? 'bg-blue-100 text-blue-700' :
                    loan.status === 'overdue' ? 'bg-red-100 text-red-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {loan.status === 'borrowed' ? 'Dipinjam' : loan.status === 'overdue' ? 'Terlambat' : 'Dikembalikan'}
                  </span>
                </div>
              )) : (
                <p className="text-gray-500 text-sm text-center py-4">Belum ada peminjaman</p>
              )}
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons text-sm mr-2 text-indigo-600">bolt</span>
                Aksi Cepat
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/admin/add-book" className="flex flex-col items-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                  <span className="material-icons text-indigo-600 mb-1">add_circle</span>
                  <span className="text-xs font-medium text-indigo-700">Tambah Buku</span>
                </Link>
                <Link to="/admin/loans" className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <span className="material-icons text-green-600 mb-1">assignment_return</span>
                  <span className="text-xs font-medium text-green-700">Proses Pengembalian</span>
                </Link>
                <Link to="/search" className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                  <span className="material-icons text-purple-600 mb-1">search</span>
                  <span className="text-xs font-medium text-purple-700">Cari Buku</span>
                </Link>
                <Link to="/admin/loans" className="flex flex-col items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                  <span className="material-icons text-orange-600 mb-1">warning</span>
                  <span className="text-xs font-medium text-orange-700">Cek Terlambat</span>
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons text-sm mr-2 text-indigo-600">analytics</span>
                Ringkasan
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Peminjaman</span>
                  <span className="font-semibold text-gray-800">{loans.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dikembalikan</span>
                  <span className="font-semibold text-green-600">{returnedLoans.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aktif</span>
                  <span className="font-semibold text-blue-600">{activeLoans.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Terlambat</span>
                  <span className="font-semibold text-red-600">{overdueLoans.length}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tingkat Pengembalian</span>
                    <span className="font-semibold text-gray-800">
                      {loans.length > 0 ? Math.round((returnedLoans.length / loans.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

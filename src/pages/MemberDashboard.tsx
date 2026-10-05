import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

export default function MemberDashboard() {
  const { user } = useAuth();
  const { loans } = useBooks();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const myLoans = loans.filter(l => l.userId === user.id);
  const activeLoans = myLoans.filter(l => l.status === 'borrowed' || l.status === 'overdue');
  const returnedLoans = myLoans.filter(l => l.status === 'returned');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="material-icons text-indigo-600 text-4xl">account_circle</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center text-sm text-gray-600">
                  <span className="material-icons text-xs mr-1">badge</span>
                  Anggota sejak {user.memberSince}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <span className="material-icons text-xs mr-1">verified</span>
                  <span className="capitalize">{user.role === 'member' ? 'Anggota' : 'Admin'}</span>
                </span>
              </div>
            </div>
            <Link to="/search" className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm">
              <span className="material-icons text-sm mr-1">search</span>
              Cari Buku
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{activeLoans.length}</div>
            <div className="text-sm text-gray-500 mt-1">Sedang Dipinjam</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{returnedLoans.length}</div>
            <div className="text-sm text-gray-500 mt-1">Dikembalikan</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <div className="text-2xl font-bold text-gray-800">{myLoans.length}</div>
            <div className="text-sm text-gray-500 mt-1">Total Peminjaman</div>
          </div>
        </div>

        {/* Active Loans */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <span className="material-icons text-sm mr-2 text-blue-600">book</span>
              Peminjaman Aktif
            </h2>
          </div>
          <div className="p-5">
            {activeLoans.length > 0 ? (
              <div className="space-y-4">
                {activeLoans.map(loan => (
                  <div key={loan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="material-icons text-blue-600">menu_book</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{loan.bookTitle}</p>
                        <p className="text-sm text-gray-500">Dipinjam: {loan.borrowDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${loan.status === 'overdue' ? 'text-red-600' : 'text-gray-600'}`}>
                        Kembali: {loan.dueDate}
                      </p>
                      {loan.status === 'overdue' && (
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Terlambat!</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-icons text-4xl text-gray-300 mb-2">library_books</span>
                <p className="text-gray-500">Tidak ada peminjaman aktif</p>
                <Link to="/search" className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-2 inline-block">
                  Cari buku untuk dipinjam →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Loan History */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <span className="material-icons text-sm mr-2 text-green-600">history</span>
              Riwayat Peminjaman
            </h2>
          </div>
          <div className="p-5">
            {returnedLoans.length > 0 ? (
              <div className="space-y-3">
                {returnedLoans.map(loan => (
                  <div key={loan.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="material-icons text-green-600 text-sm">check</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{loan.bookTitle}</p>
                        <p className="text-xs text-gray-500">{loan.borrowDate} - {loan.returnDate}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Selesai</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-icons text-4xl text-gray-300 mb-2">history</span>
                <p className="text-gray-500">Belum ada riwayat peminjaman</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

export default function ManageLoans() {
  const { isAdmin } = useAuth();
  const { loans, returnBook } = useBooks();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'borrowed' | 'overdue' | 'returned'>('all');

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const filteredLoans = loans.filter(loan => {
    if (filter === 'all') return true;
    return loan.status === filter;
  }).sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());

  const handleReturn = (loanId: string) => {
    if (confirm('Konfirmasi pengembalian buku ini?')) {
      returnBook(loanId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'borrowed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Dipinjam</span>;
      case 'overdue':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Terlambat</span>;
      case 'returned':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Dikembalikan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <span className="material-icons text-indigo-600 mr-2">swap_horiz</span>
              Kelola Peminjaman
            </h1>
            <p className="text-gray-500 mt-1">Kelola peminjaman dan pengembalian buku</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <span className="material-icons text-sm mr-1">arrow_back</span>
            Kembali
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Semua', icon: 'list' },
              { key: 'borrowed', label: 'Dipinjam', icon: 'book' },
              { key: 'overdue', label: 'Terlambat', icon: 'warning' },
              { key: 'returned', label: 'Dikembalikan', icon: 'check_circle' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="material-icons text-sm mr-1">{tab.icon}</span>
                {tab.label}
                <span className="ml-2 px-1.5 py-0.5 bg-white rounded text-xs">
                  {tab.key === 'all' ? loans.length : loans.filter(l => l.status === tab.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredLoans.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Buku</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Peminjam</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tgl Pinjam</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Jatuh Tempo</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLoans.map(loan => (
                    <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800 text-sm">{loan.bookTitle}</p>
                        <p className="text-xs text-gray-500">ID: {loan.bookId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800 text-sm">{loan.userName}</p>
                        <p className="text-xs text-gray-500">ID: {loan.userId}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{loan.borrowDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{loan.dueDate}</td>
                      <td className="px-6 py-4">{getStatusBadge(loan.status)}</td>
                      <td className="px-6 py-4">
                        {(loan.status === 'borrowed' || loan.status === 'overdue') && (
                          <button
                            onClick={() => handleReturn(loan.id)}
                            className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                          >
                            <span className="material-icons text-xs mr-1">assignment_return</span>
                            Kembalikan
                          </button>
                        )}
                        {loan.status === 'returned' && (
                          <span className="text-xs text-gray-500">Dikembalikan: {loan.returnDate}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="material-icons text-5xl text-gray-300 mb-3">inbox</span>
              <p className="text-gray-500">Tidak ada data peminjaman</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

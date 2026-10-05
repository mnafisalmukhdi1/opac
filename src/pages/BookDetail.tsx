import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { getBookById, borrowBook } = useBooks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const book = getBookById(id || '');

  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-6xl text-gray-300 mb-4">book</span>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Buku Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-6">Buku yang Anda cari tidak ada atau telah dihapus</p>
          <Link to="/search" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
            <span className="material-icons text-sm mr-2">arrow_back</span>
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const handleBorrow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role === 'admin') {
      alert('Admin tidak dapat meminjam buku');
      return;
    }
    if (book.availableCopies <= 0) {
      alert('Maaf, buku sedang tidak tersedia');
      return;
    }
    borrowBook(book.id, user.id, user.name);
    alert(`Berhasil meminjam "${book.title}". Silakan ambil di loket peminjaman.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Beranda</Link>
          <span className="material-icons text-xs">chevron_right</span>
          <Link to="/search" className="hover:text-indigo-600">Katalog</Link>
          <span className="material-icons text-xs">chevron_right</span>
          <span className="text-gray-800 font-medium truncate max-w-[200px]">{book.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Book Cover */}
            <div className="lg:col-span-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="w-full max-w-[280px]">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="lg:col-span-2 p-8">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <span className="inline-block text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full mb-3">
                    {book.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                  <p className="text-lg text-gray-600">oleh <span className="font-medium text-gray-800">{book.author}</span></p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    book.availableCopies > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${book.availableCopies > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {book.availableCopies > 0 ? `${book.availableCopies} Tersedia` : 'Tidak Tersedia'}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <span className="material-icons text-sm mr-1">business</span>
                    Penerbit
                  </div>
                  <div className="font-medium text-gray-800">{book.publisher}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <span className="material-icons text-sm mr-1">calendar_today</span>
                    Tahun
                  </div>
                  <div className="font-medium text-gray-800">{book.year}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <span className="material-icons text-sm mr-1">tag</span>
                    ISBN
                  </div>
                  <div className="font-medium text-gray-800 text-xs">{book.isbn}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <span className="material-icons text-sm mr-1">inventory_2</span>
                    Total Eksemplar
                  </div>
                  <div className="font-medium text-gray-800">{book.totalCopies} eksemplar</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <span className="material-icons text-sm mr-1">location_on</span>
                    Lokasi
                  </div>
                  <div className="font-medium text-gray-800">{book.location}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <span className="material-icons text-sm mr-1">event</span>
                    Ditambahkan
                  </div>
                  <div className="font-medium text-gray-800">{book.addedDate}</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="material-icons text-sm mr-1">description</span>
                  Deskripsi
                </h3>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleBorrow}
                  disabled={book.availableCopies <= 0}
                  className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-icons text-sm mr-2">library_add</span>
                  {book.availableCopies > 0 ? 'Pinjam Buku' : 'Tidak Tersedia'}
                </button>
                <Link
                  to="/search"
                  className="flex items-center px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  <span className="material-icons text-sm mr-2">arrow_back</span>
                  Kembali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

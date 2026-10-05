import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { categories } from '../data/mockBooks';
import { Link } from 'react-router-dom';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const navigate = useNavigate();
  const { books } = useBooks();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`);
  };

  const recentBooks = books.slice(-6).reverse();
  const totalBooks = books.length;
  const totalAvailable = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const totalCategories = [...new Set(books.map(b => b.category))].length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <span className="material-icons text-6xl text-indigo-200">auto_stories</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Temukan Buku<br />
              <span className="text-indigo-200">Impianmu</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Jelajahi ribuan koleksi buku perpustakaan secara digital. Cari, pinjam, dan kelola peminjaman buku dengan mudah.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input
                    type="text"
                    placeholder="Cari judul, penulis, atau ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2">
                    <span className="material-icons text-sm">search</span>
                    <span className="hidden sm:inline">Cari</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="material-icons text-4xl text-indigo-600 mb-2">menu_book</span>
              <div className="text-3xl font-bold text-gray-800">{totalBooks}</div>
              <div className="text-sm text-gray-500">Total Buku</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="material-icons text-4xl text-green-600 mb-2">check_circle</span>
              <div className="text-3xl font-bold text-gray-800">{totalAvailable}</div>
              <div className="text-sm text-gray-500">Tersedia</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="material-icons text-4xl text-purple-600 mb-2">category</span>
              <div className="text-3xl font-bold text-gray-800">{totalCategories}</div>
              <div className="text-sm text-gray-500">Kategori</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="material-icons text-4xl text-orange-600 mb-2">people</span>
              <div className="text-3xl font-bold text-gray-800">150+</div>
              <div className="text-sm text-gray-500">Anggota</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Books */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Koleksi Terbaru</h2>
              <p className="text-gray-500 mt-1">Buku-buku yang baru ditambahkan ke perpustakaan</p>
            </div>
            <Link to="/search" className="hidden md:flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Semua
              <span className="material-icons text-sm ml-1">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {recentBooks.map(book => (
              <Link key={book.id} to={`/book/${book.id}`} className="group">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${book.availableCopies > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {book.availableCopies > 0 ? `${book.availableCopies} tersedia` : 'Habis'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="md:hidden text-center mt-6">
            <Link to="/search" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              Lihat Semua Koleksi
              <span className="material-icons text-sm ml-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Jelajahi Kategori</h2>
            <p className="text-gray-500 mt-2">Temukan buku berdasarkan kategori favoritmu</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Novel', icon: 'auto_stories', color: 'bg-blue-50 text-blue-600' },
              { name: 'Self-Help', icon: 'psychology', color: 'bg-green-50 text-green-600' },
              { name: 'Sejarah', icon: 'history_edu', color: 'bg-amber-50 text-amber-600' },
              { name: 'Teknologi', icon: 'computer', color: 'bg-purple-50 text-purple-600' },
              { name: 'Pendidikan', icon: 'school', color: 'bg-red-50 text-red-600' },
              { name: 'Sains', icon: 'science', color: 'bg-teal-50 text-teal-600' },
            ].map(cat => (
              <Link
                key={cat.name}
                to={`/search?category=${cat.name}`}
                className={`${cat.color} rounded-xl p-5 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <span className="material-icons text-3xl mb-2">{cat.icon}</span>
                <div className="font-medium text-sm">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Jadi Anggota Perpustakaan</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan nikmati kemudahan meminjam buku, mengakses koleksi digital, dan mendapat notifikasi buku baru.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
          >
            <span className="material-icons mr-2">person_add</span>
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

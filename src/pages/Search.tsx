import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { categories } from '../data/mockBooks';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchBooks, books } = useBooks();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'Semua Kategori');
  const [sortBy, setSortBy] = useState('title');

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'Semua Kategori';

  const [results, setResults] = useState(() => {
    if (initialQuery || initialCategory !== 'Semua Kategori') {
      return searchBooks(initialQuery, initialCategory);
    }
    return books;
  });

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'Semua Kategori';
    setQuery(q);
    setCategory(cat);
    setResults(searchBooks(q, cat));
  }, [searchParams, books]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query, category });
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'author') return a.author.localeCompare(b.author);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="material-icons text-indigo-600 mr-2">search</span>
            Katalog Perpustakaan
          </h1>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari judul, penulis, ISBN..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="title">Urut: Judul</option>
              <option value="year">Urut: Tahun</option>
              <option value="author">Urut: Penulis</option>
            </select>
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2">
              <span className="material-icons text-sm">search</span>
              Cari
            </button>
          </form>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-gray-800">{sortedResults.length}</span> buku
            {(query || category !== 'Semua Kategori') && (
              <span> untuk "<span className="text-indigo-600">{query || category}</span>"</span>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {sortedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedResults.map(book => (
              <Link key={book.id} to={`/book/${book.id}`} className="group">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${book.availableCopies > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {book.availableCopies > 0 ? `${book.availableCopies} tersedia` : 'Habis'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{book.category}</span>
                    <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                      <span className="flex items-center">
                        <span className="material-icons text-xs mr-1">business</span>
                        {book.publisher}
                      </span>
                      <span>{book.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-icons text-6xl text-gray-300 mb-4">search_off</span>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Buku tidak ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci atau kategori pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}

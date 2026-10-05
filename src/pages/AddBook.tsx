import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

export default function AddBook() {
  const { isAdmin } = useAuth();
  const { addBook } = useBooks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    year: new Date().getFullYear(),
    category: 'Novel',
    description: '',
    coverUrl: '',
    totalCopies: 1,
    availableCopies: 1,
    location: ''
  });

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'year' || name === 'totalCopies' || name === 'availableCopies' ? Number(value) : value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simulate Cloudinary upload - in production, use actual Cloudinary API
    // For demo, we'll use a placeholder image
    setTimeout(() => {
      const placeholderImages = [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop',
      ];
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setForm(prev => ({ ...prev, coverUrl: randomImage }));
      setUploading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBook(form);
    setSuccess(true);
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-10">
          <span className="material-icons text-green-500 text-6xl mb-4">check_circle</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Buku Berhasil Ditambahkan!</h2>
          <p className="text-gray-500">Mengalihkan ke dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <span className="material-icons text-indigo-600 mr-2">add_circle</span>
            Tambah Buku Baru
          </h1>
          <p className="text-gray-500 mt-1">Isi informasi buku yang akan ditambahkan ke perpustakaan</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sampul Buku</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
                  {form.coverUrl ? (
                    <img src={form.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-icons text-gray-400">image</span>
                  )}
                </div>
                <div>
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">
                    <span className="material-icons text-sm mr-1">cloud_upload</span>
                    {uploading ? 'Mengunggah...' : 'Upload ke Cloudinary'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Atau masukkan URL gambar langsung</p>
                  <input
                    type="url"
                    name="coverUrl"
                    value={form.coverUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Buku *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
                placeholder="Masukkan judul buku"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Penulis *</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleInputChange}
                required
                placeholder="Nama penulis"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={form.isbn}
                onChange={handleInputChange}
                placeholder="978-xxx-xxx-xxx"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Publisher */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Penerbit *</label>
              <input
                type="text"
                name="publisher"
                value={form.publisher}
                onChange={handleInputChange}
                required
                placeholder="Nama penerbit"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Terbit *</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleInputChange}
                required
                min="1900"
                max="2030"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Novel">Novel</option>
                <option value="Novel Sejarah">Novel Sejarah</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Sains">Sains</option>
                <option value="Agama">Agama</option>
                <option value="Anak-anak">Anak-anak</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Rak *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                required
                placeholder="Contoh: Rak A-01"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Total Copies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Eksemplar *</label>
              <input
                type="number"
                name="totalCopies"
                value={form.totalCopies}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Sinopsis atau deskripsi buku..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
            >
              <span className="material-icons text-sm mr-2">save</span>
              Simpan Buku
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex items-center px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="material-icons text-indigo-400 text-3xl">local_library</span>
              <span className="font-bold text-xl">Perpustakaan<span className="text-indigo-400">Digital</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Sistem Open Public Access Catalog (OPAC) untuk memudahkan pencarian dan peminjaman buku secara digital. 
              Akses koleksi perpustakaan kapan saja dan di mana saja.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="material-icons text-sm">facebook</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="material-icons text-sm">mail</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="material-icons text-sm">phone</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Beranda</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Katalog Buku</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Masuk</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Daftar Anggota</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400 text-sm">
                <span className="material-icons text-xs mr-2">location_on</span>
                Jl. Pendidikan No. 123
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="material-icons text-xs mr-2">phone</span>
                (021) 123-4567
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="material-icons text-xs mr-2">mail</span>
                info@perpustakaan.id
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="material-icons text-xs mr-2">schedule</span>
                Sen-Jum: 08.00-17.00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Perpustakaan Digital. Sistem OPAC. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

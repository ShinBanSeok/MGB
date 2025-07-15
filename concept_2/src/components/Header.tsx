'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-black">
              INSILENCE
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-900 hover:text-gray-600">
              SEARCH
            </button>
            <button className="text-sm font-medium text-gray-900 hover:text-gray-600">
              LOGIN
            </button>
            <button 
              onClick={toggleCart}
              className="text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              CART ({getTotalItems()})
            </button>
            <button 
              className="md:hidden text-sm font-medium text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              MENU
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 py-2"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
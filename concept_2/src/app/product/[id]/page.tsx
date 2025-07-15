'use client';

import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);
  const { addToCart } = useCart();
  
  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-[3/4] bg-gray-100 mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square w-20 bg-gray-100 ${
                  selectedImage === index ? 'ring-2 ring-black' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-black mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-2 mb-4">
              {product.isOnSale && product.originalPrice ? (
                <>
                  <span className="text-xl font-bold text-red-600">
                    ₩{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₩{product.originalPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-black">
                  ₩{product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-black mb-3">COLOR</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm border ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-black mb-3">SIZE</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-black mb-3">QUANTITY</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || !selectedSize || !selectedColor}
              className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {!product.inStock ? 'SOLD OUT' : 'ADD TO CART'}
            </button>
            
            <button className="w-full border border-black text-black py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
              ADD TO WISHLIST
            </button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Free shipping on orders over ₩50,000</p>
            <p>• 30-day return policy</p>
            <p>• Secure payment guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
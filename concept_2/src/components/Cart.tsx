'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { state, removeFromCart, updateQuantity, toggleCart, getTotalPrice } = useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-black">Shopping Cart</h2>
              <button
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex space-x-4"
                  >
                    <div className="aspect-square w-20 bg-gray-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="text-sm font-medium text-black">
                        {item.product.name}
                      </h3>
                      
                      <div className="text-xs text-gray-500">
                        <p>Size: {item.selectedSize}</p>
                        <p>Color: {item.selectedColor}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ₩{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="text-xs text-gray-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>₩{getTotalPrice().toLocaleString()}</span>
              </div>
              
              <button className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
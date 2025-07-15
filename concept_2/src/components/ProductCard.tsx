import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={533}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-black">{product.name}</h3>
        
        <div className="flex items-center space-x-2">
          {product.isOnSale && product.originalPrice ? (
            <>
              <span className="text-sm font-medium text-red-600">
                ₩{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₩{product.originalPrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-black">
              ₩{product.price.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{product.colors.length} Colors</span>
          <span>•</span>
          <span>{product.sizes.length} Sizes</span>
        </div>
        
        {!product.inStock && (
          <p className="text-xs text-red-600">SOLD OUT</p>
        )}
      </div>
    </Link>
  );
}
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          PREMIUM FASHION
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of minimalist, high-quality pieces designed for the modern wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
          VIEW ALL PRODUCTS
        </button>
      </div>
    </div>
  );
}

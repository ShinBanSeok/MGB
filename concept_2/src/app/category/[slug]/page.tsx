import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(product => 
    product.category === category.id || 
    (category.id === 'sale' && product.isOnSale) ||
    (category.id === 'clearance' && product.isOnSale)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">
          {category.name}
        </h1>
        
        {category.subcategories && (
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="text-sm font-medium text-black border-b-2 border-black pb-1">
              ALL
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                className="text-sm font-medium text-gray-600 hover:text-black pb-1"
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {categoryProducts.length} items
          </p>
          
          <select className="text-sm border border-gray-300 px-3 py-1">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
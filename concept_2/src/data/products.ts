import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: 'men',
    name: 'MEN',
    slug: 'men',
    subcategories: [
      { id: 'men-jackets', name: 'JACKETS', slug: 'jackets' },
      { id: 'men-knitwear', name: 'KNITWEAR', slug: 'knitwear' },
      { id: 'men-shirts', name: 'SHIRTS', slug: 'shirts' },
      { id: 'men-tops', name: 'TOPS', slug: 'tops' },
      { id: 'men-pants', name: 'PANTS', slug: 'pants' },
      { id: 'men-denim', name: 'DENIM', slug: 'denim' },
    ]
  },
  {
    id: 'women',
    name: 'WOMEN',
    slug: 'women',
    subcategories: [
      { id: 'women-jackets', name: 'JACKETS', slug: 'jackets' },
      { id: 'women-knitwear', name: 'KNITWEAR', slug: 'knitwear' },
      { id: 'women-shirts', name: 'SHIRTS', slug: 'shirts' },
      { id: 'women-tops', name: 'TOPS', slug: 'tops' },
      { id: 'women-pants', name: 'PANTS', slug: 'pants' },
      { id: 'women-denim', name: 'DENIM', slug: 'denim' },
    ]
  },
  { id: 'sale', name: 'SALE', slug: 'sale' },
  { id: 'clearance', name: 'CLEARANCE', slug: 'clearance' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'SUPIMA COTTON BASIC TEE',
    price: 29000,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1503341338985-95b9d11b7b7a?w=800'
    ],
    category: 'men',
    subcategory: 'tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    description: 'Premium Supima cotton basic tee with comfortable fit and durability.',
    inStock: true,
    tags: ['basic', 'cotton']
  },
  {
    id: '2',
    name: 'MINIMAL DENIM JACKET',
    price: 89000,
    originalPrice: 120000,
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=800'
    ],
    category: 'men',
    subcategory: 'jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    description: 'Clean-cut denim jacket with minimal design and premium quality.',
    isOnSale: true,
    inStock: true,
    tags: ['denim', 'jacket']
  },
  {
    id: '3',
    name: 'OVERSIZED KNIT SWEATER',
    price: 65000,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'
    ],
    category: 'women',
    subcategory: 'knitwear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Charcoal', 'Camel'],
    description: 'Soft oversized knit sweater perfect for layering.',
    inStock: true,
    tags: ['knit', 'oversized']
  },
  {
    id: '4',
    name: 'WIDE LEG TROUSERS',
    price: 75000,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?w=800'
    ],
    category: 'women',
    subcategory: 'pants',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Beige'],
    description: 'Elegant wide leg trousers with tailored fit.',
    inStock: true,
    tags: ['wide', 'elegant']
  }
];
import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    return { url: 'https://picsum.photos/seed/error/600/800', hint: 'placeholder' };
  }
  return { url: image.imageUrl, hint: image.imageHint };
}

export const products: Product[] = [
  {
    id: 'dress123',
    name: 'Elegant Evening Gown',
    description: 'A stunning full-length evening gown, perfect for formal events. Made from luxurious satin with intricate beadwork.',
    price: 249.99,
    images: [getImage('product-1-1'), getImage('product-1-2')],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight Blue', 'Ruby Red', 'Emerald Green'],
    category: 'Dresses',
    stock: 15,
  },
  {
    id: 'shirt789',
    name: 'Casual Linen Shirt',
    description: 'A breathable and stylish linen shirt for a relaxed yet sophisticated look. Ideal for warm weather.',
    price: 79.99,
    images: [getImage('product-2-1')],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Sky Blue', 'Beige'],
    category: 'Shirts',
    stock: 40,
  },
  {
    id: 'shoes456',
    name: 'Leather Ankle Boots',
    description: 'Handcrafted leather ankle boots with a durable sole and comfortable fit. A versatile addition to any wardrobe.',
    price: 189.99,
    images: [getImage('product-3-1')],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Brown'],
    category: 'Shoes',
    stock: 25,
  },
  {
    id: 'pants012',
    name: 'High-Waisted Denim Jeans',
    description: 'Classic high-waisted denim jeans with a modern slim-fit cut. Made from stretch denim for ultimate comfort.',
    price: 89.99,
    images: [getImage('product-4-1')],
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Vintage Blue', 'Jet Black'],
    category: 'Pants',
    stock: 60,
  },
  {
    id: 'coat567',
    name: 'Classic Trench Coat',
    description: 'A timeless trench coat made from water-resistant gabardine fabric. Features a double-breasted front and a belted waist.',
    price: 299.99,
    images: [getImage('product-5-1')],
    sizes: ['S', 'M', 'L'],
    colors: ['Khaki', 'Navy'],
    category: 'Outerwear',
    stock: 20,
  },
  {
    id: 'blouse890',
    name: 'Silk Floral Blouse',
    description: 'An elegant silk blouse with a delicate floral print. Features long sleeves with buttoned cuffs.',
    price: 129.99,
    images: [getImage('product-6-1')],
    sizes: ['S', 'M', 'L'],
    colors: ['Cream Floral', 'Pink Floral'],
    category: 'Shirts',
    stock: 30,
  },
  {
    id: 'suit111',
    name: 'Men\'s Tailored Suit',
    description: 'A modern, slim-fit suit crafted from premium Italian wool. The jacket is single-breasted with notch lapels.',
    price: 499.99,
    images: [getImage('product-7-1')],
    sizes: ['38R', '40R', '42R', '44L'],
    colors: ['Charcoal Grey', 'Deep Navy'],
    category: 'Suits',
    stock: 10,
  },
  {
    id: 'sweater222',
    name: 'Cozy Knit Sweater',
    description: 'A soft and warm knit sweater made from a wool-cashmere blend. Perfect for layering in colder months.',
    price: 149.99,
    images: [getImage('product-8-1')],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Heather Grey', 'Oatmeal', 'Forrest Green'],
    category: 'Sweaters',
    stock: 50,
  },
  {
    id: 'skirt345',
    name: 'Pleated Midi Skirt',
    description: 'A chic and flowy pleated midi skirt that transitions effortlessly from day to night.',
    price: 99.99,
    images: [getImage('product-9-1')],
    sizes: ['S', 'M', 'L'],
    colors: ['Dusty Rose', 'Black'],
    category: 'Skirts',
    stock: 35,
  },
];

export const getProducts = () => products;

export const getProductById = (id: string) => products.find(p => p.id === id);

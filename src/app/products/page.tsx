"use client";

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products as allProducts } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [...new Set(allProducts.map(p => p.category))];
const maxPrice = Math.ceil(Math.max(...allProducts.map(p => p.price)) / 100) * 100;

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);
  
  return (
    <div className="container py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-headline">Our Collection</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Explore our curated selection of clothing, designed to bring style and quality into your wardrobe.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
                <Input 
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
                    <AccordionItem value="category">
                        <AccordionTrigger className="text-lg font-semibold">Category</AccordionTrigger>
                        <AccordionContent>
                             <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                        <AccordionTrigger className="text-lg font-semibold">Price Range</AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <div className="mb-4 flex justify-between items-center text-sm text-muted-foreground">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <Slider
                                min={0}
                                max={maxPrice}
                                step={10}
                                value={priceRange}
                                onValueChange={(value) => setPriceRange(value)}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </aside>

        <main className="md:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {allProducts.length} products
            </div>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 bg-secondary/50 rounded-lg">
                    <h2 className="text-2xl font-semibold">No Products Found</h2>
                    <p className="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}

// Use Suspense to handle search params on initial render
export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsSkeleton />}>
            <ProductsContent />
        </Suspense>
    )
}

function ProductsSkeleton() {
    return (
        <div className="container py-8">
            <header className="mb-8 text-center">
                <Skeleton className="h-12 w-1/2 mx-auto" />
                <Skeleton className="h-5 w-3/4 mx-auto mt-4" />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1 space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </aside>
                <main className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                             <div key={i} className="space-y-2">
                                <Skeleton className="aspect-[3/4] w-full" />
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-5 w-1/2" />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

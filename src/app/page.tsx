import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import Image from 'next/image';
import { Input } from "@/components/ui/input";

const featuredProducts = products.slice(0, 4);
const categories = [
    { name: 'Dresses', image: 'https://picsum.photos/seed/cat1/400/500', hint: 'woman dress', href: '/products?category=Dresses' },
    { name: 'Shirts', image: 'https://picsum.photos/seed/cat2/400/500', hint: 'man shirt', href: '/products?category=Shirts' },
    { name: 'Pants', image: 'https://picsum.photos/seed/cat3/400/500', hint: 'woman pants', href: '/products?category=Pants' },
    { name: 'Shoes', image: 'https://picsum.photos/seed/cat4/400/500', hint: 'stylish shoes', href: '/products?category=Shoes' },
];

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-24">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image 
          src="https://picsum.photos/seed/hero/1600/900" 
          alt="Model wearing stylish clothing" 
          fill
          priority
          className="object-cover"
          data-ai-hint="fashion model"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline mb-4 drop-shadow-md">
            Style That Defines You
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 drop-shadow">
            Discover our curated collection of high-quality apparel, designed for the modern individual.
          </p>
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="container">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" asChild>
                <Link href="/products">View All Products</Link>
            </Button>
        </div>
      </section>

      <section className="container">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(category => (
                <Link key={category.name} href={category.href} className="group relative block">
                    <div className="relative w-full h-96 overflow-hidden rounded-lg">
                        <Image 
                            src={category.image}
                            alt={`Category: ${category.name}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            data-ai-hint={category.hint}
                        />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-2xl font-headline text-white drop-shadow-lg">{category.name}</h3>
                    </div>
                </Link>
            ))}
        </div>
      </section>
      
      <section className="bg-secondary dark:bg-card">
        <div className="container py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-headline mb-4">Join Our Community</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                Stay in the loop with the latest trends, new arrivals, and exclusive offers. Follow us on social media and subscribe to our newsletter.
            </p>
            <form className="flex max-w-md mx-auto gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
        </div>
      </section>
    </div>
  );
}

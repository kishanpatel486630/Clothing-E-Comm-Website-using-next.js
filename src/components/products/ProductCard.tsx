"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add with the first available size and color for simplicity
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <Card className="w-full overflow-hidden group transition-all duration-300 hover:shadow-xl focus-within:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            data-ai-hint={product.images[0].hint}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
             <Button size="icon" variant="secondary" className="bg-background/80" onClick={handleAddToCart} aria-label="Add to cart">
                <ShoppingCart className="h-5 w-5"/>
            </Button>
             <Button size="icon" variant="secondary" className="bg-background/80" aria-label="Add to wishlist">
                <Heart className="h-5 w-5"/>
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="text-lg font-bold mt-2 text-primary">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

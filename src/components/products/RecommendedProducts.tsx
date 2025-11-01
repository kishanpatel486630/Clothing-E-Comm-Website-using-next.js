"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "@/ai/flows/ai-powered-recommendations";
import { useCart } from "@/context/CartProvider";
import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { Skeleton } from "../ui/skeleton";

export default function RecommendedProducts({ currentProductId }: { currentProductId: string }) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useCart();
  
  useEffect(() => {
    // This effect runs only on the client
    const history = JSON.parse(localStorage.getItem('browsingHistory') || '[]');
    if (!history.includes(currentProductId)) {
      const newHistory = [...history, currentProductId].slice(-10); // Keep last 10
      localStorage.setItem('browsingHistory', JSON.stringify(newHistory));
    }
  }, [currentProductId]);

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      // Ensure this code also runs only on the client
      const browsingHistory = JSON.parse(localStorage.getItem('browsingHistory') || '[]');
      const cartContents = cartItems.map(item => item.product.id);

      try {
        const result = await getRecommendations({
          browsingHistory: browsingHistory.join(','),
          cartContents: cartContents.join(','),
        });

        const recommendedProducts = result.recommendations
          .map(id => getProductById(id))
          .filter((p): p is Product => p !== undefined && p.id !== currentProductId)
          .slice(0, 4); // Show up to 4 recommendations
        
        setRecommendations(recommendedProducts);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    }

    // Delay fetch to ensure history is updated
    const timer = setTimeout(() => {
        fetchRecommendations();
    }, 100);

    return () => clearTimeout(timer);
    
  }, [cartItems, currentProductId]);

  if (loading) {
    return (
        <div>
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="aspect-[3/4] w-full" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the section if there are no recommendations
  }

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-headline text-center mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

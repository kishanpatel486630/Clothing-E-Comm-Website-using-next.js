"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-2 block">Size</Label>
        <RadioGroup
          value={selectedSize}
          onValueChange={setSelectedSize}
          className="flex flex-wrap gap-2"
          aria-label="Select size"
        >
          {product.sizes.map((size) => (
            <div key={size}>
              <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
              <Label
                htmlFor={`size-${size}`}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                data-state={selectedSize === size ? 'checked' : 'unchecked'}
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold mb-2 block">Color</Label>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex flex-wrap gap-2"
          aria-label="Select color"
        >
          {product.colors.map((color) => (
            <div key={color}>
              <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
              <Label
                htmlFor={`color-${color}`}
                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                data-state={selectedColor === color ? 'checked' : 'unchecked'}
              >
                {color}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <Button type="submit" size="lg" className="w-full">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </form>
  );
}

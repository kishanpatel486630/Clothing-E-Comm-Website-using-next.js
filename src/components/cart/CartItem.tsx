"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartProvider";
import type { CartItem as CartItemType } from "@/lib/types";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      updateQuantity(item.product.id, item.size, item.color, value);
    }
  }

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.product.images[0].url}
          alt={item.product.name}
          fill
          sizes="100px"
          className="object-cover"
          data-ai-hint={item.product.images[0].hint}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">
          ${item.product.price.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="h-8 w-16 text-center"
            aria-label={`Quantity for ${item.product.name}`}
          />
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0"
        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
        aria-label={`Remove ${item.product.name} from cart`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

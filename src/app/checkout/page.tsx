"use client";

import { useEffect } from 'react';
import { useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const total = getCartTotal();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/products');
    }
  }, [cartItems, router]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We've received your order.",
    });
    clearCart();
    router.push('/');
  }

  if (cartItems.length === 0) {
     return <div className="container py-12 text-center">Redirecting...</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-headline text-center mb-8">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2"><Label htmlFor="name">Full Name</Label><Input id="name" required /></div>
              <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
              <div className="col-span-full grid gap-2"><Label htmlFor="address">Address</Label><Input id="address" required /></div>
              <div className="grid gap-2"><Label htmlFor="city">City</Label><Input id="city" required /></div>
              <div className="grid gap-2"><Label htmlFor="state">State / Province</Label><Input id="state" required /></div>
              <div className="grid gap-2"><Label htmlFor="zip">ZIP / Postal Code</Label><Input id="zip" required /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2"><Label htmlFor="card-name">Name on Card</Label><Input id="card-name" required /></div>
              <div className="grid gap-2"><Label htmlFor="card-number">Card Number</Label><Input id="card-number" placeholder="xxxx-xxxx-xxxx-xxxx" required /></div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="grid gap-2"><Label htmlFor="expiry-date">Expiry</Label><Input id="expiry-date" placeholder="MM/YY" required /></div>
                <div className="grid gap-2"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" required /></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                     <Image src={item.product.images[0].url} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.product.images[0].hint}/>
                     <div>
                        <p className="font-semibold line-clamp-1">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity} x ${item.product.price.toFixed(2)}</p>
                     </div>
                  </div>
                  <p className="font-medium text-right flex-shrink-0">${(item.quantity * item.product.price).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold"><p>Subtotal</p><p>${total.toFixed(2)}</p></div>
              <div className="flex justify-between text-muted-foreground"><p>Shipping</p><p>Free</p></div>
              <Separator />
              <div className="flex justify-between text-lg font-bold"><p>Total</p><p>${total.toFixed(2)}</p></div>
              <Button type="submit" size="lg" className="w-full">Place Order</Button>
            </CardContent>
          </Card>
        </aside>
      </form>
    </div>
  );
}

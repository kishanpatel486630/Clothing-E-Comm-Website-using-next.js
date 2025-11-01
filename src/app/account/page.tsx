"use client"

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return <div className="container py-12 text-center">Redirecting to login...</div>;
    }

    return (
        <div className="container py-12">
            <h1 className="text-4xl font-headline mb-8">My Account</h1>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="items-center text-center p-6">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.email}`} alt={user.name} />
                                <AvatarFallback className="text-3xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline">{user.name}</CardTitle>
                             <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 flex flex-col space-y-2">
                           <Button variant="outline" asChild><Link href="/account/orders">View Orders</Link></Button>
                           <Button variant="destructive" onClick={logout}>Log Out</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader><CardTitle className="font-headline">Account Details</CardTitle></CardHeader>
                        <CardContent>
                            <p>Welcome to your account dashboard. Here you can manage your personal information, view your order history, and more.</p>
                            <p className="mt-4 text-muted-foreground">(More features coming soon!)</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

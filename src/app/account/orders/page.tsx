"use client"

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Mock Data
const mockOrders = [
    { id: 'ORD-12345', date: '2023-10-26', total: 249.99, status: 'Delivered' },
    { id: 'ORD-12346', date: '2023-11-15', total: 189.99, status: 'Shipped' },
    { id: 'ORD-12347', date: '2023-11-20', total: 79.99, status: 'Pending' },
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Delivered': return 'default';
        case 'Shipped': return 'secondary';
        case 'Pending': return 'outline';
        default: return 'default';
    }
}

export default function OrdersPage() {
    const { user } = useAuth();
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
            <div className="flex items-center mb-8">
                <Button variant="outline" size="icon" className="mr-4" asChild>
                    <Link href="/account"><ChevronLeft className="h-4 w-4" /></Link>
                </Button>
                <h1 className="text-4xl font-headline">My Orders</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Here are all the orders you've placed with us.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockOrders.length > 0 ? mockOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell><Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge></TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        You haven't placed any orders yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

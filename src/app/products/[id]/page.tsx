import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getProducts } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AddToCartForm from '@/components/products/AddToCartForm';
import RecommendedProducts from '@/components/products/RecommendedProducts';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map(product => ({ id: product.id }));
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={product.images[0].hint}
            />
          </div>
          {/* You can add a gallery for multiple images here */}
        </div>

        <div className="flex flex-col">
          <div className="flex-1">
            <Badge variant="outline">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline mt-2">{product.name}</h1>
            <p className="text-3xl font-bold mt-4 text-primary">${product.price.toFixed(2)}</p>
            <Separator className="my-6" />
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mt-8">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
      <div className="mt-16 md:mt-24">
        <RecommendedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}

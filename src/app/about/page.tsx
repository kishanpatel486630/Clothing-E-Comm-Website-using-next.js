import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary">About ThreadCanvas</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Weaving together style, quality, and sustainability to create clothing that tells a story.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden">
             <Image src="https://picsum.photos/seed/about1/800/600" alt="Fashion designers at work" fill className="object-cover" data-ai-hint="fashion designer" />
          </div>
          <div>
            <h2 className="text-3xl font-headline mb-4">Our Philosophy</h2>
            <div className="text-muted-foreground space-y-4">
              <p>At ThreadCanvas, we believe that clothing is more than just fabric stitched together; it's a form of self-expression, a work of art, and a commitment to a better future. Our name reflects this belief: every 'Thread' is chosen with purpose, and every collection is a 'Canvas' for you to express your unique style.</p>
              <p>We are passionate about creating timeless pieces that you'll love for years to come, not just for a season. Our design process is rooted in a deep appreciation for craftsmanship, quality materials, and a modern, minimalist aesthetic.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-last md:order-first">
            <h2 className="text-3xl font-headline mb-4">Commitment to Sustainability</h2>
            <div className="text-muted-foreground space-y-4">
              <p>Sustainability is at the core of everything we do. We are committed to minimizing our environmental impact by using eco-friendly materials, partnering with ethical manufacturers, and reducing waste throughout our supply chain.</p>
              <p>From organic cotton to recycled fabrics, we're constantly exploring innovative ways to make fashion more sustainable without compromising on quality or style. It's a journey, and we're dedicated to making a positive difference, one garment at a time.</p>
            </div>
          </div>
           <div className="relative h-96 rounded-lg overflow-hidden order-first md:order-last">
             <Image src="https://picsum.photos/seed/about2/800/600" alt="Sustainable fabrics" fill className="object-cover" data-ai-hint="sustainable fabric" />
          </div>
        </div>
      </div>
    </div>
  );
}

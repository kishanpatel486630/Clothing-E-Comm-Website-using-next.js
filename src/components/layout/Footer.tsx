import { Github, Twitter, Instagram } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground dark:bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              High-quality clothing for the modern individual.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Github">
                <Github className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=Dresses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dresses</Link></li>
              <li><Link href="/products?category=Shirts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shirts</Link></li>
              <li><Link href="/products?category=Pants" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pants</Link></li>
              <li><Link href="/products?category=Shoes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shoes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Subscribe to get the latest on sales, new releases and more.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ThreadCanvas. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

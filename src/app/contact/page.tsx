import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-headline mb-6">Get in Touch</h2>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="grid gap-1.5"><Label htmlFor="name">Name</Label><Input id="name" placeholder="Your Name" /></div>
              <div className="grid gap-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="Your Email" /></div>
            </div>
            <div className="grid gap-1.5"><Label htmlFor="subject">Subject</Label><Input id="subject" placeholder="What can we help with?" /></div>
            <div className="grid gap-1.5"><Label htmlFor="message">Message</Label><Textarea id="message" placeholder="Your message..." rows={5} /></div>
            <Button type="submit" size="lg">Send Message</Button>
          </form>
        </div>
        <div className="space-y-8">
            <h2 className="text-3xl font-headline mb-6">Our Information</h2>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><Mail className="h-6 w-6" /></div>
                <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p className="text-muted-foreground">Reach out to us via email for any inquiries.</p>
                    <a href="mailto:support@threadcanvas.com" className="text-primary hover:underline">support@threadcanvas.com</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><Phone className="h-6 w-6" /></div>
                <div>
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <p className="text-muted-foreground">Our customer support is available from 9am to 5pm.</p>
                    <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><MapPin className="h-6 w-6" /></div>
                <div>
                    <h3 className="text-xl font-semibold">Office</h3>
                    <p className="text-muted-foreground">123 Fashion Ave, New York, NY 10001</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

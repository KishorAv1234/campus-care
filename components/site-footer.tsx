import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-muted/40 py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Campus Care</h3>
            <p className="text-muted-foreground">
              Your one-stop solution for all campus needs - from study materials
              to health tracking.
            </p>
            <div className="flex space-x-4 mt-4">
              <Button size="icon" variant="ghost">
                <FacebookIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <TwitterIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <InstagramIcon className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <YoutubeIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/pomodoro" className="text-muted-foreground hover:text-foreground">
                  Pomodoro Timer
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>© 2023 Campus Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@assets/Untitled design-5_1763412376461.png";

interface HeaderProps {
  currentPage?: "home" | "services" | "about" | "blog" | "contact";
}

export function Header({ currentPage }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", page: "home" },
    { href: "/services", label: "Services", page: "services" },
    { href: "/about", label: "About", page: "about" },
    { href: "/blog", label: "Blog", page: "blog" },
    { href: "/contact", label: "Contact", page: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200" data-testid="link-logo">
              <img src={logo} alt="Route Reach AK" className="h-10 md:h-12 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.page}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === link.page
                    ? "text-foreground hover:text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${link.page}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.page}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-base font-medium transition-colors duration-200 py-2 px-3 rounded-md ${
                      currentPage === link.page
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    data-testid={`link-mobile-nav-${link.page}`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

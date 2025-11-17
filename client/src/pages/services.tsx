import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertPrintQuoteRequestSchema, type InsertPrintQuoteRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, Check, Mail, Printer, Globe, Megaphone } from "lucide-react";

export default function Services() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 md:h-20">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200" data-testid="text-logo">
                Anchorage Direct Mail
              </a>
            </div>
            <nav className="hidden md:flex flex-wrap items-center space-x-8">
              <a 
                href="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="link-nav-home"
              >
                Home
              </a>
              <a 
                href="/services" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                data-testid="link-nav-services"
              >
                Services
              </a>
              <a 
                href="/about" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="link-nav-about"
              >
                About
              </a>
              <a 
                href="/blog" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="link-nav-blog"
              >
                Blog
              </a>
              <a 
                href="/contact" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="link-nav-contact"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/20 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-heading">
                Our Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From affordable shared campaigns to custom marketing solutions
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Hero Card - Shared Mailer */}
              <Card 
                className="md:col-span-2 lg:row-span-2 hover-elevate cursor-pointer border-primary/20" 
                onClick={() => scrollToSection('shared-mailer')}
                data-testid="card-service-shared-mailer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-3xl font-bold text-primary">$600</p>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mt-4">Shared Direct Mail Campaigns</CardTitle>
                  <CardDescription className="text-base">
                    Reach 5,000 Anchorage households for a fraction of the cost. Industry-exclusive slots mean no competition in your mailer.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Industry exclusivity - 1 business per industry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">5,000 households per route</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">We handle design, print, and mailing</span>
                    </li>
                  </ul>
                  <Button className="w-full" data-testid="button-learn-more-shared-mailer">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Medium Cards */}
              <Card 
                className="hover-elevate cursor-pointer" 
                onClick={() => scrollToSection('solo-campaigns')}
                data-testid="card-service-solo-campaigns"
              >
                <CardHeader>
                  <div className="p-3 rounded-md bg-primary/10 w-fit">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-right absolute top-6 right-6">
                    <p className="text-xs text-muted-foreground">Starting at</p>
                    <p className="text-xl font-bold text-foreground">$2,500</p>
                  </div>
                  <CardTitle className="mt-4">Solo Direct Mail</CardTitle>
                  <CardDescription>
                    Your business only. Full creative control. Premium postcard stock.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" data-testid="button-learn-more-solo">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="hover-elevate cursor-pointer" 
                onClick={() => scrollToSection('print-materials')}
                data-testid="card-service-print-materials"
              >
                <CardHeader>
                  <div className="p-3 rounded-md bg-primary/10 w-fit">
                    <Printer className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-right absolute top-6 right-6">
                    <p className="text-xs text-muted-foreground">Pricing</p>
                    <p className="text-lg font-bold text-foreground">Custom</p>
                  </div>
                  <CardTitle className="mt-4">Print Marketing</CardTitle>
                  <CardDescription>
                    Flyers, door hangers, business cards, banners, and more. 24-hour quote turnaround.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" data-testid="button-get-quote">
                    Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="hover-elevate cursor-pointer" 
                onClick={() => scrollToSection('landing-pages')}
                data-testid="card-service-landing-pages"
              >
                <CardHeader>
                  <div className="p-3 rounded-md bg-primary/10 w-fit">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-right absolute top-6 right-6">
                    <p className="text-xs text-muted-foreground">Starting at</p>
                    <p className="text-xl font-bold text-foreground">$750</p>
                  </div>
                  <CardTitle className="mt-4">Landing Pages</CardTitle>
                  <CardDescription>
                    Custom landing pages optimized for conversions. Perfect for campaigns and promotions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" data-testid="button-book-consultation">
                    Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Service Sections */}
        <SharedMailerSection />
        <SoloCampaignsSection />
        <PrintMaterialsSection />
        <LandingPagesSection />
      </main>

      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Services</a></li>
                <li><a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">About</a></li>
                <li><a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Anchorage Direct Mail. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SharedMailerSection() {
  return (
    <section id="shared-mailer" className="py-20 md:py-24 border-b bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shared Direct Mail Campaigns
            </h2>
            <p className="text-lg text-muted-foreground">
              The most affordable way to reach 5,000 Anchorage households with your message.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Industry Exclusivity</p>
                    <p className="text-sm text-muted-foreground">Only 1 business per industry category per mailer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Professional Design</p>
                    <p className="text-sm text-muted-foreground">Custom design matching your brand</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Premium Printing</p>
                    <p className="text-sm text-muted-foreground">12x9 heavy stock postcards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Complete Mailing</p>
                    <p className="text-sm text-muted-foreground">USPS EDDM handling included</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Reserve Your Slot</p>
                  <p className="text-sm text-muted-foreground">Book online and submit your business details</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Design Phase (3-5 days)</p>
                  <p className="text-sm text-muted-foreground">We create your postcard design and send for approval</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Finalize by December 26, 2025</p>
                  <p className="text-sm text-muted-foreground">Final deadline for January 5, 2026 mailing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">4</span>
                </div>
                <div>
                  <p className="font-medium">Mails January 5, 2026</p>
                  <p className="text-sm text-muted-foreground">Your postcards reach 5,000 Anchorage households</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-primary">$600</span>
                <span className="text-muted-foreground">per campaign</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Compare to $4,000 for a solo campaign. Shared mailers give you the same reach at 85% savings.
              </p>
              <Button size="lg" className="w-full md:w-auto" data-testid="button-reserve-slot">
                Reserve Your Slot Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function SoloCampaignsSection() {
  return (
    <section id="solo-campaigns" className="py-20 md:py-24 border-b bg-muted/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Solo Direct Mail Campaigns
            </h2>
            <p className="text-lg text-muted-foreground">
              Your business gets the entire mailer. Maximum visibility and creative control.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">100% of the Mailer</p>
                    <p className="text-sm text-muted-foreground">No other businesses, just yours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Full Creative Control</p>
                    <p className="text-sm text-muted-foreground">Any design, any message, your choice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Premium Stock</p>
                    <p className="text-sm text-muted-foreground">Heavy weight, premium finish options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Flexible Quantity</p>
                    <p className="text-sm text-muted-foreground">2,500 to 20,000+ households</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">$2,500-$4,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Final price depends on quantity and design complexity
                  </p>
                </div>
              </div>
              <div className="bg-background p-4 rounded-md mb-6">
                <p className="text-sm font-medium mb-2">Schedule a free consultation to discuss:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your target area and household count</li>
                  <li>• Design preferences and messaging</li>
                  <li>• Timeline and mailing dates</li>
                </ul>
              </div>
              <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center mb-4">
                <p className="text-sm text-muted-foreground">Calendly Embed - Solo Campaigns</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PrintMaterialsSection() {
  const { toast } = useToast();
  
  const form = useForm<InsertPrintQuoteRequest>({
    resolver: zodResolver(insertPrintQuoteRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      materialType: "",
      quantity: "",
      timeline: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertPrintQuoteRequest) => {
      const res = await apiRequest("POST", "/api/request-quote", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll send you a detailed quote within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <section id="print-materials" className="py-20 md:py-24 border-b bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Print Marketing Materials
            </h2>
            <p className="text-lg text-muted-foreground">
              High-quality printing for all your marketing needs. 24-hour quote turnaround.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What We Print</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="font-medium">Flyers</p>
                </div>
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="font-medium">Door Hangers</p>
                </div>
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="font-medium">Business Cards</p>
                </div>
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="font-medium">Banners</p>
                </div>
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="font-medium">Brochures</p>
                </div>
                <div className="text-center p-4 rounded-md bg-muted/50">
                  <p className="font-medium">Yard Signs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request a Quote</CardTitle>
              <CardDescription>Tell us what you need and we'll send you a detailed quote within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-quote-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} data-testid="input-quote-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(907) 555-1234" {...field} value={field.value || ""} data-testid="input-quote-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your business" {...field} value={field.value || ""} data-testid="input-quote-business" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="materialType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Material Type (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <FormControl>
                              <SelectTrigger data-testid="select-material-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="flyers">Flyers</SelectItem>
                              <SelectItem value="door-hangers">Door Hangers</SelectItem>
                              <SelectItem value="business-cards">Business Cards</SelectItem>
                              <SelectItem value="banners">Banners</SelectItem>
                              <SelectItem value="brochures">Brochures</SelectItem>
                              <SelectItem value="yard-signs">Yard Signs</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 500, 1000" {...field} value={field.value || ""} data-testid="input-quote-quantity" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeline (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Needed by January 15" {...field} value={field.value || ""} data-testid="input-quote-timeline" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific requirements, design notes, or questions..."
                            className="resize-none"
                            rows={4}
                            {...field}
                            value={field.value || ""}
                            data-testid="textarea-quote-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={submitMutation.isPending}
                    data-testid="button-submit-quote"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Request Quote"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function LandingPagesSection() {
  return (
    <section id="landing-pages" className="py-20 md:py-24 bg-muted/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Landing Page Design
            </h2>
            <p className="text-lg text-muted-foreground">
              Custom landing pages that convert visitors into customers.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Custom Design</p>
                    <p className="text-sm text-muted-foreground">Tailored to your brand and campaign</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Mobile Optimized</p>
                    <p className="text-sm text-muted-foreground">Perfect on all devices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Conversion Focused</p>
                    <p className="text-sm text-muted-foreground">Designed to drive action</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Fast Turnaround</p>
                    <p className="text-sm text-muted-foreground">1-2 weeks from approval</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfect For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Pairing with your direct mail campaign for tracking responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Seasonal promotions and limited-time offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Event registration and RSVPs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Lead generation campaigns</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">$750-$1,500</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Price depends on complexity and features
                  </p>
                </div>
              </div>
              <div className="bg-background p-4 rounded-md mb-6">
                <p className="text-sm font-medium mb-2">Book a consultation to discuss:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your campaign goals and target audience</li>
                  <li>• Design preferences and branding</li>
                  <li>• Features needed (forms, video, etc.)</li>
                  <li>• Timeline and launch date</li>
                </ul>
              </div>
              <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center mb-4">
                <p className="text-sm text-muted-foreground">Calendly Embed - Landing Pages</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

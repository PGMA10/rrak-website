import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  insertPrintQuoteRequestSchema, 
  type InsertPrintQuoteRequest,
  insertEmailMarketingWaitlistSchema,
  insertPrintMaterialsWaitlistSchema,
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { ArrowRight, Check, Mail, Printer, Globe, Megaphone, FileText, DoorClosed, CreditCard, Flag, BookOpen, SignpostBig, Sticker, Frame } from "lucide-react";
import postcardMockup from "@assets/BackFront Example-2_1763363158551.png";
import logo from "@assets/Untitled design-5_1763412376461.png";

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
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200" data-testid="link-logo">
                <img src={logo} alt="Rute Reach AK" className="h-10 md:h-12 w-auto" />
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
            <div className="space-y-6">
              {/* Hero Card - Shared Mailer (Full Width) */}
              <Card 
                className="hover-elevate cursor-pointer border-primary/20 overflow-visible" 
                onClick={() => scrollToSection('shared-mailer')}
                data-testid="card-service-shared-mailer"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Left Content */}
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-3 rounded-md bg-primary/10">
                        <Mail className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Starting at</p>
                        <p className="text-3xl font-bold text-primary">$600</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Shared Direct Mail Campaigns
                      </h3>
                      <p className="text-base text-muted-foreground">
                        Reach 5,000 Anchorage households for a fraction of the cost. Industry-exclusive slots mean no competition in your mailer.
                      </p>
                    </div>
                    <ul className="space-y-3">
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
                    <Button className="w-full md:w-auto" data-testid="button-learn-more-shared-mailer">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Right - Postcard Mockup with 3D Shadow */}
                  <div className="flex items-end justify-center bg-gradient-to-b from-muted/40 to-muted/60 rounded-lg p-12 pb-16">
                    <div className="relative w-full max-w-md" style={{ perspective: '1000px' }}>
                      <div style={{ transform: 'rotateX(2deg)' }}>
                        <img 
                          src={postcardMockup} 
                          alt="Direct mail postcard example showing multiple local businesses"
                          className="w-full h-auto rounded-sm"
                          style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.3)'
                          }}
                          data-testid="img-postcard-mockup"
                        />
                        <div 
                          className="absolute inset-x-0 -bottom-1 h-32 rounded-sm"
                          style={{
                            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
                            filter: 'blur(10px)',
                            transform: 'translateY(10px) scaleY(0.3)',
                            zIndex: -1
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Other Service Cards in Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  onClick={() => scrollToSection('coming-soon')}
                  data-testid="card-service-coming-soon"
                >
                  <CardHeader>
                    <div className="p-3 rounded-md bg-primary/10 w-fit">
                      <Printer className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-right absolute top-6 right-6">
                      <Badge className="bg-primary/10 text-primary border-primary/20">Coming Soon</Badge>
                    </div>
                    <CardTitle className="mt-4">Upcoming Services</CardTitle>
                    <CardDescription>
                      Email marketing campaigns and print materials. Join our waitlist for early access.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" data-testid="button-join-waitlist">
                      Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
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
          </div>
        </section>

        {/* Detailed Service Sections */}
        <SharedMailerSection />
        <SoloCampaignsSection />
        <ComingSoonServicesSection />
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

function ComingSoonServicesSection() {
  return (
    <section id="coming-soon" className="py-20 md:py-24 border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Coming Soon Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Be the first to know when these services launch. Join the waitlist and get exclusive early access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <EmailMarketingWaitlistCard />
            <PrintMaterialsWaitlistCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailMarketingWaitlistCard() {
  const { toast } = useToast();
  
  const emailMarketingSchema = insertEmailMarketingWaitlistSchema.extend({
    email: z.string().email("Invalid email address"),
  });
  
  type EmailMarketingWaitlistForm = z.infer<typeof emailMarketingSchema>;

  const form = useForm<EmailMarketingWaitlistForm>({
    resolver: zodResolver(emailMarketingSchema),
    defaultValues: {
      email: "",
      name: "",
      businessName: "",
      serviceType: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: EmailMarketingWaitlistForm) => {
      const res = await apiRequest("POST", "/api/email-marketing-waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when Email Marketing services launch.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="hover-elevate" data-testid="card-email-marketing-waitlist">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-2">
          <Mail className="h-8 w-8 text-primary flex-shrink-0" data-testid="icon-email-marketing" />
          <Badge className="bg-primary/10 text-primary border-primary/20" data-testid="badge-coming-soon-email">
            Coming Soon
          </Badge>
        </div>
        <CardTitle className="text-2xl" data-testid="title-email-marketing">Email Marketing</CardTitle>
        <CardDescription data-testid="description-email-marketing">
          Automated email campaigns that nurture leads and drive repeat business. Perfect for staying top-of-mind with your customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>I'm interested in:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Newsletter" data-testid="radio-newsletter" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Newsletter</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Promotional campaigns" data-testid="radio-promotional" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Promotional campaigns</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Cold outreach" data-testid="radio-cold-outreach" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Cold outreach</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Not sure yet" data-testid="radio-not-sure" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Not sure yet</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your name"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-email-marketing-name"
                    />
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
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      data-testid="input-email-marketing-email"
                    />
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
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Business name (optional)"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-email-marketing-business"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
                data-testid="button-join-email-marketing-waitlist"
              >
                {submitMutation.isPending ? "Joining..." : "Join Email Marketing Waitlist"}
              </Button>
              <p className="text-xs text-center text-muted-foreground" data-testid="text-early-bird-email">
                Join the waitlist to be first in line when we launch + get exclusive early-bird pricing
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function PrintMaterialsWaitlistCard() {
  const { toast } = useToast();
  
  const printMaterialsSchema = insertPrintMaterialsWaitlistSchema.extend({
    email: z.string().email("Invalid email address"),
  });
  
  type PrintMaterialsWaitlistForm = z.infer<typeof printMaterialsSchema>;

  const form = useForm<PrintMaterialsWaitlistForm>({
    resolver: zodResolver(printMaterialsSchema),
    defaultValues: {
      email: "",
      name: "",
      businessName: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: PrintMaterialsWaitlistForm) => {
      const res = await apiRequest("POST", "/api/print-materials-waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when Print Materials services launch.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="hover-elevate" data-testid="card-print-materials-waitlist">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-2">
          <Printer className="h-8 w-8 text-primary flex-shrink-0" data-testid="icon-print-materials" />
          <Badge className="bg-primary/10 text-primary border-primary/20" data-testid="badge-coming-soon-print">
            Coming Soon
          </Badge>
        </div>
        <CardTitle className="text-2xl" data-testid="title-print-materials">Print Materials</CardTitle>
        <CardDescription data-testid="description-print-materials">
          High-quality printing for flyers, business cards, brochures, and more. We handle design, print coordination, and delivery.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your email"
                      {...field}
                      data-testid="input-print-materials-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-print-materials-name"
                    />
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
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Business name (optional)"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-print-materials-business"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={submitMutation.isPending}
              data-testid="button-join-print-materials-waitlist"
            >
              {submitMutation.isPending ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
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
                    <p className="font-medium">QR Code Provided</p>
                    <p className="text-sm text-muted-foreground">Get a scannable QR code linking to your landing page for use in direct mail, flyers, or event materials</p>
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
              <div className="space-y-6 mb-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-foreground">$750-$1,500</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Price depends on complexity and features
                  </p>
                  <div className="bg-background p-4 rounded-md">
                    <p className="text-sm font-semibold text-foreground mb-1">Payment Terms:</p>
                    <p className="text-sm text-muted-foreground">50% deposit required to start, 50% due before launch</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-foreground">What's included at each tier:</p>
                  
                  <div className="bg-background p-4 rounded-md space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Basic ($750):</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Single-page design (5-7 sections)</li>
                        <li>• Mobile-optimized and fast-loading</li>
                        <li>• Contact form integration</li>
                        <li>• QR code for easy sharing</li>
                        <li>• Basic SEO setup</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Standard ($1,100):</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Everything in Basic, plus:</li>
                        <li>• Custom graphics and imagery</li>
                        <li>• Video embed capability</li>
                        <li>• Lead magnet integration (PDF download, etc.)</li>
                        <li>• Email marketing platform connection</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Premium ($1,500):</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Everything in Standard, plus:</li>
                        <li>• Booking system integration</li>
                        <li>• Multi-step forms</li>
                        <li>• Advanced animations and interactions</li>
                        <li>• A/B testing setup</li>
                        <li>• Priority turnaround (1 week)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-4 rounded-md mb-6">
                <p className="text-sm font-medium mb-2">Book a consultation to discuss:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your campaign goals and target audience</li>
                  <li>• Design preferences and branding requirements</li>
                  <li>• Features needed (forms, video, booking, etc.)</li>
                  <li>• Timeline and launch date</li>
                  <li>• How you'll drive traffic (direct mail, social media, events, etc.)</li>
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

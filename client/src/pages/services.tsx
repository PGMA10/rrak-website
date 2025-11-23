import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
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
  insertSoloMailerWaitlistSchema,
  insertLandingPagesWaitlistSchema,
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { ArrowRight, Check, Mail, Printer, Globe, Megaphone, FileText, DoorClosed, CreditCard, Flag, BookOpen, SignpostBig, Sticker, Frame } from "lucide-react";
import postcardMockup from "@assets/BackFront Example-2_1763363158551.png";
import logoWatermark from "@assets/Mail and Map Connection Logo_1763412132703.png";
import { Header } from "@/components/Header";

export default function Services() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Direct Mail Services"
        description="Route Reach AK offers shared direct mail campaigns reaching 5,000 Anchorage households for $600. Industry-exclusive mailers with full-service design, printing, and mailing. Solo campaigns and landing page design coming soon."
      />
      <Header currentPage="services" />

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

              {/* Coming Soon Services Card */}
              <Card 
                className="hover-elevate cursor-pointer" 
                onClick={() => scrollToSection('coming-soon')}
                data-testid="card-service-coming-soon"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="p-3 rounded-md bg-primary/10 flex-shrink-0">
                        <Megaphone className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">Upcoming Services</h3>
                          <Badge className="bg-primary/10 text-primary border-primary/20">Coming Soon</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Solo direct mail campaigns, custom landing pages, email marketing, and print materials. Join our waitlist for early access and exclusive early-bird pricing.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="flex-shrink-0 w-full md:w-auto" data-testid="button-join-waitlist">
                      Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Service Sections */}
        <SharedMailerSection />
        <FAQSection />
        <ComingSoonServicesSection />
      </main>

      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Services</a></li>
                <li><a href="https://route-reach-ak-1-patrick575.replit.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Reserve a Slot</a></li>
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
              © {new Date().getFullYear()} Route Reach AK. All rights reserved.
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

          <Card className="relative overflow-hidden">
            <div 
              className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
              style={{
                backgroundImage: `url(${logoWatermark})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
                opacity: 0.04,
                transform: 'translate(20%, 20%)',
              }}
            />
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
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

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Single Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary">$600</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Perfect for testing direct mail. Reach 5,000 households for 85% less than a solo campaign.
                </p>
                <Button size="lg" className="w-full" data-testid="button-reserve-single">
                  Reserve Your Slot
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  3-Month Package
                  <Badge className="bg-primary text-primary-foreground">Save $300</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary">$1,500</span>
                  <span className="text-muted-foreground">$500/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Build momentum with consistency. Lock in your industry category for 3 campaigns.
                </p>
                <Button size="lg" className="w-full" data-testid="button-reserve-3month">
                  Reserve Your Slot
                </Button>
              </CardContent>
            </Card>
          </div>
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
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/patrick-routereachak/30min"
                style={{ minWidth: '320px', height: '700px' }}
                data-testid="calendly-solo-campaigns"
              />
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
            <SoloMailerWaitlistCard />
            <LandingPagesWaitlistCard />
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
      serviceTypes: [],
    },
  });

  const serviceOptions = [
    { id: "newsletter", label: "Newsletter" },
    { id: "promotional-campaigns", label: "Promotional campaigns" },
    { id: "cold-outreach", label: "Cold outreach" },
    { id: "not-sure", label: "Not sure yet" },
  ];

  const selectedServices = form.watch("serviceTypes") || [];

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    const currentValue = form.getValues("serviceTypes") || [];
    const currentSet = new Set(currentValue);
    
    if (checked) {
      currentSet.add(serviceId);
    } else {
      currentSet.delete(serviceId);
    }
    
    form.setValue("serviceTypes", Array.from(currentSet), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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
            <div className="space-y-2">
              <FormLabel>I'm interested in: (select all that apply)</FormLabel>
              <div className="flex flex-col space-y-2">
                {serviceOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${option.id}`}
                      checked={selectedServices.includes(option.id)}
                      onCheckedChange={(checked) => handleServiceToggle(option.id, checked === true)}
                      data-testid={`checkbox-${option.id}`}
                    />
                    <label
                      htmlFor={`service-${option.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
      materialTypes: [],
      otherMaterialType: "",
      industry: "",
      quantity: "",
      typicalNeed: "",
    },
  });

  const materialOptions = [
    { id: "flyers", label: "Flyers" },
    { id: "door-hangers", label: "Door Hangers" },
    { id: "business-cards", label: "Business Cards" },
    { id: "brochures", label: "Brochures" },
    { id: "banners", label: "Banners" },
    { id: "yard-signs", label: "Yard Signs" },
    { id: "promotional-products", label: "Promotional Products" },
    { id: "other", label: "Other" },
  ];

  const selectedMaterials = form.watch("materialTypes") || [];

  const handleMaterialToggle = (materialId: string, checked: boolean) => {
    const currentValue = form.getValues("materialTypes") || [];
    const currentSet = new Set(currentValue);
    
    if (checked) {
      currentSet.add(materialId);
    } else {
      currentSet.delete(materialId);
    }
    
    const newSelected = Array.from(currentSet);
    form.setValue("materialTypes", newSelected, { 
      shouldValidate: true, 
      shouldDirty: true, 
      shouldTouch: true 
    });
  };

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
          <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="materialTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What materials do you need? (select all that apply)</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {materialOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={(field.value || []).includes(option.id)}
                            onCheckedChange={(checked) => handleMaterialToggle(option.id, checked === true)}
                            data-testid={`checkbox-material-${option.id}`}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedMaterials.includes("other") && (
              <FormField
                control={form.control}
                name="otherMaterialType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Please specify other material type"
                        {...field}
                        value={field.value || ""}
                        data-testid="input-other-material-type"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-industry">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Home Services">Home Services</SelectItem>
                      <SelectItem value="Restaurants/Food">Restaurants/Food</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Professional Services">Professional Services</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Fitness/Wellness">Fitness/Wellness</SelectItem>
                      <SelectItem value="Beauty/Salon">Beauty/Salon</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
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
                  <FormLabel>Quantity</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-quantity">
                        <SelectValue placeholder="Select quantity range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="100-250">100-250</SelectItem>
                      <SelectItem value="250-500">250-500</SelectItem>
                      <SelectItem value="500-1000">500-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                      <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typicalNeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typical need</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-typical-need">
                        <SelectValue placeholder="Select typical need" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                      <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
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
                      data-testid="input-print-materials-name"
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
                      data-testid="input-print-materials-email"
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

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
                data-testid="button-join-print-materials-waitlist"
              >
                {submitMutation.isPending ? "Joining..." : "Join Print Materials Waitlist"}
              </Button>
              <p className="text-xs text-center text-muted-foreground" data-testid="text-early-bird-print">
                Join the waitlist to be first in line when we launch + get exclusive early-bird pricing
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SoloMailerWaitlistCard() {
  const { toast } = useToast();
  
  const soloMailerSchema = insertSoloMailerWaitlistSchema.extend({
    email: z.string().email("Invalid email address"),
  });
  
  type SoloMailerWaitlistForm = z.infer<typeof soloMailerSchema>;

  const form = useForm<SoloMailerWaitlistForm>({
    resolver: zodResolver(soloMailerSchema),
    defaultValues: {
      email: "",
      name: "",
      businessName: "",
      interestAreas: [],
    },
  });

  const interestOptions = [
    { id: "exclusive-reach", label: "Exclusive campaign (no competitors)" },
    { id: "target-neighborhoods", label: "Target specific neighborhoods" },
    { id: "seasonal-promotions", label: "Seasonal promotions" },
    { id: "new-product-launch", label: "New product/service launch" },
    { id: "customer-acquisition", label: "Customer acquisition" },
    { id: "not-sure", label: "Not sure yet" },
  ];

  const selectedInterests = form.watch("interestAreas") || [];

  const handleInterestToggle = (interestId: string, checked: boolean) => {
    const currentValue = form.getValues("interestAreas") || [];
    const currentSet = new Set(currentValue);
    
    if (checked) {
      currentSet.add(interestId);
    } else {
      currentSet.delete(interestId);
    }
    
    form.setValue("interestAreas", Array.from(currentSet), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const submitMutation = useMutation({
    mutationFn: async (data: SoloMailerWaitlistForm) => {
      const res = await apiRequest("POST", "/api/solo-mailer-waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when Solo Direct Mail services launch.",
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
    <Card className="hover-elevate" data-testid="card-solo-mailer-waitlist">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-2">
          <Megaphone className="h-8 w-8 text-primary flex-shrink-0" data-testid="icon-solo-mailer" />
          <Badge className="bg-primary/10 text-primary border-primary/20" data-testid="badge-coming-soon-solo">
            Coming Soon
          </Badge>
        </div>
        <CardTitle className="text-2xl" data-testid="title-solo-mailer">Solo Direct Mail</CardTitle>
        <CardDescription data-testid="description-solo-mailer">
          Own the entire mailer for maximum impact. Exclusive reach to 5,000+ households with your message alone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
            <div className="space-y-2">
              <FormLabel>I'm interested in: (select all that apply)</FormLabel>
              <div className="flex flex-col space-y-2">
                {interestOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`solo-${option.id}`}
                      checked={selectedInterests.includes(option.id)}
                      onCheckedChange={(checked) => handleInterestToggle(option.id, checked === true)}
                      data-testid={`checkbox-solo-${option.id}`}
                    />
                    <label
                      htmlFor={`solo-${option.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
                      data-testid="input-solo-mailer-name"
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
                      data-testid="input-solo-mailer-email"
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
                      data-testid="input-solo-mailer-business"
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
                data-testid="button-join-solo-mailer-waitlist"
              >
                {submitMutation.isPending ? "Joining..." : "Join Solo Direct Mail Waitlist"}
              </Button>
              <p className="text-xs text-center text-muted-foreground" data-testid="text-early-bird-solo">
                Join the waitlist to be first in line when we launch + get exclusive early-bird pricing
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function LandingPagesWaitlistCard() {
  const { toast } = useToast();
  
  const landingPagesSchema = insertLandingPagesWaitlistSchema.extend({
    email: z.string().email("Invalid email address"),
  });
  
  type LandingPagesWaitlistForm = z.infer<typeof landingPagesSchema>;

  const form = useForm<LandingPagesWaitlistForm>({
    resolver: zodResolver(landingPagesSchema),
    defaultValues: {
      email: "",
      name: "",
      businessName: "",
      interestAreas: [],
    },
  });

  const interestOptions = [
    { id: "lead-capture", label: "Lead capture forms" },
    { id: "event-registration", label: "Event registration" },
    { id: "product-showcase", label: "Product/service showcase" },
    { id: "service-bookings", label: "Service bookings" },
    { id: "email-capture", label: "Email list building" },
    { id: "not-sure", label: "Not sure yet" },
  ];

  const selectedInterests = form.watch("interestAreas") || [];

  const handleInterestToggle = (interestId: string, checked: boolean) => {
    const currentValue = form.getValues("interestAreas") || [];
    const currentSet = new Set(currentValue);
    
    if (checked) {
      currentSet.add(interestId);
    } else {
      currentSet.delete(interestId);
    }
    
    form.setValue("interestAreas", Array.from(currentSet), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const submitMutation = useMutation({
    mutationFn: async (data: LandingPagesWaitlistForm) => {
      const res = await apiRequest("POST", "/api/landing-pages-waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when Landing Pages services launch.",
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
    <Card className="hover-elevate" data-testid="card-landing-pages-waitlist">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 mb-2">
          <Globe className="h-8 w-8 text-primary flex-shrink-0" data-testid="icon-landing-pages" />
          <Badge className="bg-primary/10 text-primary border-primary/20" data-testid="badge-coming-soon-landing">
            Coming Soon
          </Badge>
        </div>
        <CardTitle className="text-2xl" data-testid="title-landing-pages">Landing Pages</CardTitle>
        <CardDescription data-testid="description-landing-pages">
          Custom landing pages that turn your campaigns into trackable conversions. Professionally designed and optimized for results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
            <div className="space-y-2">
              <FormLabel>I'm interested in: (select all that apply)</FormLabel>
              <div className="flex flex-col space-y-2">
                {interestOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`landing-${option.id}`}
                      checked={selectedInterests.includes(option.id)}
                      onCheckedChange={(checked) => handleInterestToggle(option.id, checked === true)}
                      data-testid={`checkbox-landing-${option.id}`}
                    />
                    <label
                      htmlFor={`landing-${option.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
                      data-testid="input-landing-pages-name"
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
                      data-testid="input-landing-pages-email"
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
                      data-testid="input-landing-pages-business"
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
                data-testid="button-join-landing-pages-waitlist"
              >
                {submitMutation.isPending ? "Joining..." : "Join Landing Pages Waitlist"}
              </Button>
              <p className="text-xs text-center text-muted-foreground" data-testid="text-early-bird-landing">
                Join the waitlist to be first in line when we launch + get exclusive early-bird pricing
              </p>
            </div>
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
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/patrick-routereachak/30min"
                style={{ minWidth: '320px', height: '700px' }}
                data-testid="calendly-landing-pages"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [visibleCount, setVisibleCount] = useState(4);

  const allFAQs = [
    {
      id: "what-is",
      question: "What is a shared mailer campaign?",
      answer: (
        <>
          <p className="mb-4">
            16 businesses share one premium 9×12" postcard mailed to 5,000 Anchorage households. Each business gets a 2.8" × 3.8" ad slot with industry exclusivity - only ONE business per category per card.
          </p>
          <p>
            You reach 5,000 potential customers for $600 instead of $4,000+ for a solo campaign.
          </p>
        </>
      )
    },
    {
      id: "whats-included",
      question: "What's included in $600?",
      answer: (
        <>
          <ul className="space-y-2 ml-4">
            <li>✅ Strategy consultation</li>
            <li>✅ Professional design & copywriting</li>
            <li>✅ Revisions until you're satisfied</li>
            <li>✅ Premium printing (9×12" postcard)</li>
            <li>✅ Mailing to 5,000 households</li>
            <li>✅ QR code tracking</li>
            <li>✅ Post-campaign report</li>
          </ul>
          <p className="mt-4">You provide: Logo, offer details, photos (optional), design approval.</p>
        </>
      )
    },
    {
      id: "how-it-works",
      question: "How does the shared mailer process work?",
      answer: (
        <>
          <p className="mb-4">Four steps:</p>
          <ol className="space-y-3 ml-4">
            <li><strong>1. Book Your Slot</strong> - Choose your industry category (first-come, first-served)</li>
            <li><strong>2. Submit Your Info</strong> - Logo, offer, photos (optional), contact details</li>
            <li><strong>3. Design & Approval</strong> - We create your ad, you approve it (revisions included)</li>
            <li><strong>4. Print & Mail</strong> - We handle everything, your ad hits 5,000 mailboxes</li>
          </ol>
          <p className="mt-4">Timeline: 3-4 weeks from booking to mailboxes.</p>
        </>
      )
    },
    {
      id: "what-to-provide",
      question: "What do I need to provide?",
      answer: (
        <>
          <p className="mb-4"><strong>Required:</strong></p>
          <ul className="space-y-2 ml-4 mb-4">
            <li>• Business logo (any format)</li>
            <li>• Your offer or key message</li>
            <li>• Contact info (phone, website, etc.)</li>
          </ul>
          <p className="mb-4"><strong>Optional but helpful:</strong></p>
          <ul className="space-y-2 ml-4">
            <li>• Photos of your work, products, or team</li>
            <li>• Preferred colors or brand guidelines</li>
          </ul>
          <p>Your time: ~30 minutes total.</p>
        </>
      )
    },
    {
      id: "why-3-month",
      question: "Why do the 3-month package?",
      answer: (
        <>
          <p className="mb-4">Three reasons:</p>
          <ol className="space-y-2 ml-4">
            <li><strong>1. Save $300</strong> ($1,500 vs $1,800)</li>
            <li><strong>2. Build momentum</strong> - People need 3-7 exposures before acting. Consistency wins.</li>
            <li><strong>3. Lock your category</strong> - Guarantee industry exclusivity for 3 straight campaigns</li>
          </ol>
          <p className="mt-4">Most clients see significantly better ROI with 3 months vs one-off tests.</p>
        </>
      )
    },
    {
      id: "no-competitors",
      question: "How do you guarantee no competitors?",
      answer: (
        <>
          <p className="mb-4">Each postcard has 16 slots. When you book your industry category (e.g., "HVAC," "Dentist," "Real Estate"), it's locked for that campaign. First-come, first-served.</p>
          <p>Competitors who try to book after you see your category is unavailable.</p>
        </>
      )
    },
    {
      id: "results",
      question: "What kind of results should I expect?",
      answer: (
        <>
          <p className="mb-4">Direct mail averages 1-3% response rate. Here's what that means:</p>
          <ul className="space-y-2 ml-4 mb-4">
            <li>• 5,000 households see your ad</li>
            <li>• 50-150 people take action (QR scan, call, visit)</li>
            <li>• 10-30% convert to customers</li>
            <li>• Result: 5-45 new customers from one $600 campaign</li>
          </ul>
          <p className="mb-4"><strong>ROI Example:</strong></p>
          <p className="mb-2">If your average customer is worth $200, you need 3 customers to break even. Everything beyond that is profit.</p>
          <p className="mb-4">If your average customer is worth $500 (HVAC, dental, legal), 3 customers = $1,500 revenue = 2.5x ROI on $600.</p>
          <p>Results vary by industry and offer. First campaigns dial in messaging. Repeat campaigns compound results.</p>
        </>
      )
    },
    {
      id: "tracking",
      question: "How do I track results?",
      answer: (
        <>
          <p className="mb-4">Three ways:</p>
          <ol className="space-y-2 ml-4 mb-4">
            <li><strong>1. QR code analytics</strong> - See how many people scanned, when, and what device</li>
            <li><strong>2. Phone tracking</strong> - Ask callers "How did you hear about us?"</li>
            <li><strong>3. Website traffic spike</strong> - If QR links to your site, you'll see the surge</li>
          </ol>
          <p>I provide a post-campaign report with your data and optimization recommendations.</p>
        </>
      )
    },
    {
      id: "next-campaign",
      question: "When is the next campaign?",
      answer: <>Campaigns run monthly. Miss this one? Next one mails the first week of February 2026.</>
    },
    {
      id: "neighborhoods",
      question: "What neighborhoods do you target?",
      answer: (
        <>
          <p className="mb-4">Affluent Anchorage areas with $100K-$200K+ household incomes. Homeowners with disposable income - your ideal customers.</p>
          <p><strong>Current routes:</strong> Abbott Loop, Hillside, Goldenview, Kincaid, Sand Lake, Jewel Lake, and Turnagain.</p>
        </>
      )
    }
  ];

  const showMore = () => {
    setVisibleCount((prev: number) => Math.min(prev + 4, allFAQs.length));
  };

  const visibleFAQs = allFAQs.slice(0, visibleCount);
  const hasMore = visibleCount < allFAQs.length;

  return (
    <section className="py-20 md:py-24 border-b bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-faq">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-faq-description">
              Everything you need to know about our shared mailer campaigns
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {visibleFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} data-testid={`accordion-faq-${faq.id}`}>
                <AccordionTrigger className="text-left" data-testid={`trigger-faq-${faq.id}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {hasMore && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={showMore}
                data-testid="button-show-more-faqs"
              >
                Show More Questions
              </Button>
            </div>
          )}

          <div className="text-center pt-8">
            <a 
              href="/contact"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              data-testid="link-more-questions-main"
            >
              Have more questions? Contact us <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

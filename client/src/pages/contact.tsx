import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      serviceInterest: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await apiRequest("POST", "/api/submit-lead", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Contact Us"
        description="Get in touch with Route Reach AK for direct mail marketing in Anchorage, Alaska. Reserve your industry-exclusive slot in our January 2026 shared mailer campaign. Call (907) 947-4624 or email contact@routereachak.com"
      />
      <Header currentPage="contact" />

      <main className="flex-1 py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="heading-contact">
                Let's Talk
              </h1>
              <p className="text-lg text-muted-foreground">
                Got questions about our services? Looking for something specific? Ready to reserve your spot in the January campaign? Reach out below - I'll respond within 24 hours.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="input-name" />
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
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(907) 555-1234" {...field} value={field.value || ""} data-testid="input-phone" />
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
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Business" {...field} value={field.value || ""} data-testid="input-business" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="serviceInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interest</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="shared-campaign">Shared Direct Mail Campaign</SelectItem>
                          <SelectItem value="solo-campaign">Solo Campaign</SelectItem>
                          <SelectItem value="consultation">Free Consultation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your business and marketing goals..."
                          className="resize-none min-h-[120px]"
                          {...field}
                          value={field.value || ""}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg font-bold"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? "Sending..." : "Submit"}
                </Button>
              </form>
            </Form>

            {/* FAQ Section */}
            <div className="mt-16 pt-16 border-t space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-contact-faq">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-contact-faq-description">
                  Here are answers to common concerns before reaching out
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trust" data-testid="accordion-faq-trust">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-trust">Why should I trust you?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">I'm local to Anchorage. You work directly with me - not an account manager.</p>
                    <p className="mb-4">I handle everything:</p>
                    <ul className="space-y-2 ml-4 mb-4">
                      <li>• Strategy, design, copywriting</li>
                      <li>• Print, USPS execution, tracking</li>
                    </ul>
                    <p className="mb-4"><strong>Transparent pricing.</strong> No hidden fees.</p>
                    <p className="mb-4"><strong>No long-term traps.</strong> Month-to-month or 3-month max commitment.</p>
                    <p>Still unsure? Start with one campaign for $600. See the execution and results. Then decide if you want to continue.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="no-results" data-testid="accordion-faq-no-results">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-no-results">What if I don't get results?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">Let's be realistic: No marketing is guaranteed.</p>
                    <p className="mb-4"><strong>What I control:</strong> Professional design, compelling copy, flawless execution, performance tracking.</p>
                    <p className="mb-4"><strong>What I don't control:</strong> Whether your offer resonates, your follow-through, external factors.</p>
                    <p className="mb-4">If a campaign underperforms: We review the data, adjust messaging/offer, test until we find what works.</p>
                    <p>Most businesses need 2-3 campaigns to dial in their message. Consistency compounds results.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="get-started" data-testid="accordion-faq-get-started">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-get-started">How do I get started?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ol className="space-y-3 ml-4 mb-4">
                      <li><strong>1. Reserve Your Slot</strong> - Book your industry category for the next campaign</li>
                      <li><strong>2. Choose Your Package</strong> - Single campaign ($600) or 3-Month ($1,500)</li>
                      <li><strong>3. Brief Consultation</strong> - Tell me your goal (10-15 min call)</li>
                      <li><strong>4. Approve Design</strong> - Review and approve your ad</li>
                      <li><strong>5. I Handle the Rest</strong> - Print, mail, track, report</li>
                    </ol>
                    <p className="mb-4">Questions first? Contact me using the form above or call <strong>(907) 947-4624</strong>.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="design-approval" data-testid="accordion-faq-design-approval">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-design-approval">
                    What if I don't like my design?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    You approve everything before it prints. I send you a proof, you request changes (included), we iterate until you're satisfied. Your ad doesn't mail unless you're happy with it.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cancel" data-testid="accordion-faq-cancel">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-cancel">
                    Can I cancel after 3 months?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes. After 3 months, choose to continue month-to-month ($600), commit to another 3-month package (save $300), or stop. No automatic renewals.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="industry-booked" data-testid="accordion-faq-booked">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-booked">
                    What if my industry is already booked?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="mb-4">Three options:</p>
                    <ol className="space-y-2 ml-4">
                      <li><strong>1. Book another route</strong> - Each campaign runs multiple routes</li>
                      <li><strong>2. Join the waitlist</strong> - Get notified if a spot opens</li>
                      <li><strong>3. Book next month's campaign</strong> - Lock in your category for the next mailing</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timeline" data-testid="accordion-faq-timeline">
                  <AccordionTrigger className="text-left" data-testid="trigger-faq-timeline">
                    How long until I see results?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <ul className="space-y-2 ml-4 mb-4">
                      <li><strong>Days 1-7:</strong> Immediate responses (QR scans, calls)</li>
                      <li><strong>Weeks 2-4:</strong> Secondary responses (people who saved the postcard)</li>
                      <li><strong>Months 2-3:</strong> Delayed responses (remembered when they needed you)</li>
                    </ul>
                    <p className="mb-4">Peak response is in the first 2 weeks. Activity continues for months.</p>
                    <p>This is why 3-month campaigns work - each builds on the last.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="text-center pt-8">
                <p className="text-sm text-muted-foreground mb-4" data-testid="text-phone-label">
                  Prefer to talk? Call us directly:
                </p>
                <a 
                  href="tel:+19079474624" 
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                  data-testid="link-phone"
                >
                  (907) 947-4624
                </a>
                <p className="text-sm text-muted-foreground mt-2" data-testid="text-phone-hours">
                  Monday-Friday, 9am-5pm AKST
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4" data-testid="text-footer-heading-product">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-features">
                    Services
                  </a>
                </li>
                <li>
                  <a href="https://route-reach-ak-1-patrick575.replit.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-pricing">
                    Reserve a Slot
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4" data-testid="text-footer-heading-company">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-about">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-blog">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4" data-testid="text-footer-heading-support">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center" data-testid="text-copyright">
              © {new Date().getFullYear()} Route Reach AK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

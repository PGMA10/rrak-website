import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, Mail, TrendingUp, Eye, Calendar } from "lucide-react";
import postcardImage from "@assets/BackFront Example-2_1763355311870.png";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const deadline = new Date("2025-12-26T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6" data-testid="countdown-timer">
      <div className="flex flex-col items-center bg-card border border-card-border rounded-md px-4 py-3 min-w-[70px]">
        <span className="text-3xl md:text-4xl font-bold text-primary" data-testid="countdown-days">{timeLeft.days}</span>
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Days</span>
      </div>
      <div className="flex flex-col items-center bg-card border border-card-border rounded-md px-4 py-3 min-w-[70px]">
        <span className="text-3xl md:text-4xl font-bold text-primary" data-testid="countdown-hours">{timeLeft.hours}</span>
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Hours</span>
      </div>
      <div className="flex flex-col items-center bg-card border border-card-border rounded-md px-4 py-3 min-w-[70px]">
        <span className="text-3xl md:text-4xl font-bold text-primary" data-testid="countdown-minutes">{timeLeft.minutes}</span>
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Minutes</span>
      </div>
      <div className="flex flex-col items-center bg-card border border-card-border rounded-md px-4 py-3 min-w-[70px]">
        <span className="text-3xl md:text-4xl font-bold text-primary" data-testid="countdown-seconds">{timeLeft.seconds}</span>
        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Seconds</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 md:h-20">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200" data-testid="text-logo">
                Your Brand
              </a>
            </div>
            <nav className="hidden md:flex flex-wrap items-center space-x-8">
              <a 
                href="/" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                data-testid="link-nav-home"
              >
                Home
              </a>
              <a 
                href="/services" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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
        <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight" data-testid="hero-headline">
                    Reach 5,000 Anchorage Households for $600 - <span className="text-primary">We Handle Everything</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="hero-subheadline">
                    Shared direct mail campaign mailing January 5, 2026. Reserve your industry-exclusive slot before designs finalize December 26.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span data-testid="countdown-label">Designs Finalize In:</span>
                  </div>
                  <CountdownTimer />
                </div>

                <div>
                  <Button 
                    size="lg"
                    className="text-lg px-8 py-6 h-auto font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                    data-testid="button-cta-hero"
                  >
                    Reserve Your Slot Now
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3" data-testid="text-cta-subtext">
                    Limited spots available per industry
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-md overflow-hidden shadow-2xl group">
                  <img 
                    src={postcardImage} 
                    alt="Direct mail postcard mockup" 
                    className="w-full h-auto relative z-10"
                    data-testid="img-postcard-mockup"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/50 via-white/25 to-transparent dark:from-white/30 dark:via-white/15 pointer-events-none z-20 rounded-b-md"></div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4 uppercase tracking-wide" data-testid="text-postcard-description">
                  12x9 Premium Stock Postcard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 lg:py-24" data-testid="section-how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-how-it-works">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to reach thousands of Anchorage households
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="relative" data-testid="card-step-1">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 text-primary">
                    <span className="text-3xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Reserve Your Slot</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Secure your industry-exclusive spot in the shared mailing. Only one business per category to avoid competition.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative" data-testid="card-step-2">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 text-primary">
                    <span className="text-3xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Approve Your Design</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Review and approve your custom postcard design before the December 26 deadline. We handle all the design work.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative" data-testid="card-step-3">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 text-primary">
                    <span className="text-3xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Mail Drops</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your postcard arrives in 5,000+ Anchorage mailboxes on January 5, 2026. Sit back and watch the calls come in.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Direct Mail Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-muted/30" data-testid="section-why-direct-mail">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-why-direct-mail">
                Why Direct Mail Crushes Digital
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                While your competitors fight over expensive clicks, direct mail delivers guaranteed visibility
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card data-testid="card-stat-1">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-md bg-primary/10">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">90% Open Rate</h3>
                    <p className="text-muted-foreground">
                      Direct mail gets opened and read, unlike emails that get buried or ignored
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-stat-2">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-md bg-primary/10">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">17-Day Shelf Life</h3>
                    <p className="text-muted-foreground">
                      Postcards sit on counters and fridges - constant reminders of your business
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-stat-3">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-md bg-primary/10">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">5X ROI Average</h3>
                    <p className="text-muted-foreground">
                      Direct mail delivers measurable results with higher response rates than digital ads
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-8 bg-card border border-card-border rounded-md">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 flex-shrink-0">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold text-foreground">Treated Like a Magazine, Not Spam</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Physical mail commands attention and respect. People sort through it carefully, unlike digital ads they scroll past in seconds. Your message becomes part of their daily routine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 md:py-20 lg:py-24" data-testid="section-social-proof">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-testimonials">
                Join Anchorage Businesses Growing with Direct Mail
              </h2>
              <p className="text-lg text-muted-foreground">
                Testimonials coming soon from our first campaign participants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} data-testid={`card-testimonial-placeholder-${i}`}>
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-muted" />
                      <div className="space-y-1">
                        <div className="h-4 w-24 bg-muted rounded-md" />
                        <div className="h-3 w-32 bg-muted rounded-md" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted rounded-md" />
                      <div className="h-3 w-full bg-muted rounded-md" />
                      <div className="h-3 w-3/4 bg-muted rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/20 to-background" data-testid="section-final-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" data-testid="heading-final-cta">
                Don't Miss the January 5th Mailing
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Designs finalize December 26. Reserve your industry-exclusive slot now before your competitor does.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 h-auto font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                data-testid="button-cta-final"
              >
                Reserve Your Slot Now
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">Industry Exclusivity</span>
                    <span className="text-xs">1 business per industry.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">5,000 Households</span>
                    <span className="text-xs">per route</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">Everything Included</span>
                    <span className="text-xs">Design + Print + Mail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-features">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-pricing">
                    Pricing
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
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-footer-help">
                    Help Center
                  </a>
                </li>
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
              © {new Date().getFullYear()} Your Brand. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

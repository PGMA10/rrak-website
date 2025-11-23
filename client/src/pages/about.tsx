import headshot from "@assets/GRAVATAR-CAREER FAIR HEADSHOTS-JRE-0409 copy_1763433381511.jpg";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="About Patrick - Founder of Route Reach AK"
        description="Meet Patrick Moses Jr., founder of Route Reach AK. Helping Alaska businesses become unforgettable through strategic direct mail marketing and brand positioning. Local focus, full-service approach, transparent pricing."
      />
      <Header currentPage="about" />
      <main className="flex-1">
        {/* Section 1: Mission */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-heading-name">
                  Hi, I'm Patrick!
                </h1>
                <p className="text-xl text-muted-foreground" data-testid="text-subheadline">
                  I help Alaska businesses grow through strategic direct mail marketing and brand positioning.
                </p>
              </div>

              <div className="relative bg-primary/5 border-l-4 border-primary p-6 rounded-r-md my-16">
                <div className="absolute -top-3 left-4 bg-background px-2">
                  <span className="text-xs font-semibold text-primary" data-testid="text-mission-label">
                    Route Reach AK's Mission
                  </span>
                </div>
                <p className="text-lg font-semibold text-foreground" data-testid="text-mission-statement">
                  To deliver high-impact marketing strategies that increase your visibility and strengthen your market position.
                </p>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-foreground">
                <p className="text-base leading-relaxed" data-testid="text-body-1">
                  Most businesses struggle with the same problem: marketing that actually cuts through.
                </p>
                
                <p className="text-base leading-relaxed" data-testid="text-body-2">
                  Social media is a saturated mess where your posts compete with cat videos and political rants. Email marketing works - if you can figure out how to build a list without spending months doing it. Digital platforms keep changing their rules, and suddenly what worked last quarter doesn't work now.
                </p>
                
                <p className="text-base leading-relaxed" data-testid="text-body-3">
                  You didn't start a business to become a full-time marketer. You started it to serve customers. But you can't serve them if they don't know you exist.
                </p>
                
                <p className="text-base leading-relaxed font-semibold" data-testid="text-body-4">
                  That's why I created Route Reach AK.
                </p>
                
                <p className="text-base leading-relaxed" data-testid="text-body-5">
                  <strong>Shared Direct Mail Campaigns</strong> let you reach 5,000 households for just $600 - with full-service design, copywriting, printing, and mailing. Professional reach that cuts through the digital noise.
                </p>
                
                {/* <p className="text-base leading-relaxed" data-testid="text-body-6">
                  <strong>Solo Campaigns</strong> give you exclusive reach when you're ready to own the entire mailer - starting at $2,500.
                </p> */}
                
                {/* <p className="text-base leading-relaxed" data-testid="text-body-7">
                  <strong>Landing Pages</strong> turn your campaigns into trackable conversions - custom-built for $750-$1,500.
                </p> */}
                
                <p className="text-base leading-relaxed" data-testid="text-body-8">
                  Whatever your growth stage, I handle the strategy, design, and execution. You focus on running your business. I'll make sure Alaska sees what makes you worth choosing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About Patrick */}
        <section className="py-16 md:py-24 bg-muted/10 border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-heading-about-patrick">
                About Patrick
              </h2>
              
              {/* Professional Headshot - floats right on desktop */}
              <div className="w-full max-w-xs md:float-right md:ml-8 md:mb-4 mb-6">
                <div className="aspect-square overflow-hidden rounded-full">
                  <img 
                    src={headshot} 
                    alt="Patrick Moses Jr. - Founder of Route Reach AK" 
                    className="w-full h-full object-cover"
                    data-testid="img-headshot"
                  />
                </div>
              </div>
              
              <div className="space-y-4 text-base leading-relaxed text-foreground">
                <p data-testid="text-about-intro">
                  I help Alaska businesses become unforgettable.
                </p>
                
                <p data-testid="text-about-p1">
                  Most business owners come to me wanting more customers. What they actually want? A business that's recognized, respected, and thriving.
                </p>
                
                <p data-testid="text-about-p2">
                  Here's what I've learned building everything from mobile apps to booking platforms: tactics alone don't work. You can run the perfect campaign, but if you don't know who you are, what makes you different, and why people should care - it's just noise.
                </p>
                
                <p data-testid="text-about-p3">
                  The tactics work when the foundation is clear. When you know what you want, what you stand for, and how you serve others - the path becomes obvious.
                </p>
                
                <p data-testid="text-about-p4">
                  That's what I bring to Route Reach AK. I don't just design postcards and coordinate mailings. I help you clarify your message, sharpen your positioning, and amplify what makes your business worth noticing.
                </p>
                
                <p className="font-semibold" data-testid="text-about-conclusion">
                  You get more than a marketing campaign. You get a strategic partner who pushes you to be better - and when you're better, your business thrives.
                </p>
              </div>
            </div>

            {/* Why Route Reach AK Is Different */}
            <div className="bg-background rounded-lg p-8 md:p-12 border mb-24">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center" data-testid="text-heading-why-different">
                Why Route Reach AK Is Different
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" data-testid="text-bullet-local-title">
                      Local Alaska Focus
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-bullet-local-desc">I live here, understand this market, and I'm committed to helping businesses reach customers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" data-testid="text-bullet-full-service-title">
                      Full-Service Approach
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-bullet-full-service-desc">
                      You don't need a designer or marketing team - I handle it all
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" data-testid="text-bullet-pricing-title">
                      Transparent Pricing
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-bullet-pricing-desc">
                      What you see is what you pay - no surprises
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" data-testid="text-bullet-exclusivity-title">
                      Industry Exclusivity
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-bullet-exclusivity-desc">
                      Only one business per category per campaign - your competitors won't be in your mailer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-cta-heading">
                Ready to reach 5,000 Alaska households?
              </h3>
              
              <div className="flex flex-col items-center justify-center gap-4">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover-elevate active-elevate-2 h-10 px-8 my-12"
                  data-testid="button-reserve-slot"
                >
                  Reserve Your Slot
                </a>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <a 
                    href="/contact"
                    className="text-base text-primary underline hover:text-primary/80 transition-colors"
                    data-testid="link-contact"
                  >Got Questions?</a>
                  <a 
                    href="mailto:contact@routereachak.com"
                    className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-email"
                  >
                    contact@routereachak.com
                  </a>
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

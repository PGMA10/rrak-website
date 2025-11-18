import logo from "@assets/Untitled design-5_1763412376461.png";

export default function About() {
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="link-nav-services"
              >
                Services
              </a>
              <a 
                href="/about" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
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
        {/* Section 1: Mission */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-heading-name">
                  Hi, I'm Patrick Moses Jr.
                </h1>
                <p className="text-xl text-muted-foreground" data-testid="text-subheadline">
                  I help Alaska businesses grow through strategic direct mail marketing and brand positioning.
                </p>
              </div>

              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-md my-8">
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
                
                <p className="text-base leading-relaxed" data-testid="text-body-6">
                  <strong>Solo Campaigns</strong> give you exclusive reach when you're ready to own the entire mailer - starting at $2,500.
                </p>
                
                <p className="text-base leading-relaxed" data-testid="text-body-7">
                  <strong>Landing Pages</strong> turn your campaigns into trackable conversions - custom-built for $750-$1,500.
                </p>
                
                <p className="text-base leading-relaxed" data-testid="text-body-8">
                  Whatever your growth stage, I handle the strategy, design, and execution. You focus on running your business. I'll make sure Alaska sees what makes you worth choosing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About Patrick */}
        <section className="py-16 md:py-24 bg-muted/10 border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-heading-about-patrick">
                About Patrick
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground" data-testid="text-about-patrick-placeholder">
                [Section 2 content - to be specified]
              </p>
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
              © {new Date().getFullYear()} Rute Reach AK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

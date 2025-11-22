import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertLeadSchema,
  insertNewsletterSubscriberSchema,
  insertPrintQuoteRequestSchema,
  insertConsultationBookingSchema,
  insertEmailMarketingWaitlistSchema,
  insertPrintMaterialsWaitlistSchema,
  insertSoloMailerWaitlistSchema,
  insertLandingPagesWaitlistSchema,
} from "@shared/schema";
import {
  sendLeadNotification,
  sendNewsletterNotification,
  sendQuoteRequestNotification,
  sendConsultationNotification,
  sendEmailMarketingWaitlistNotification,
  sendPrintMaterialsWaitlistNotification,
  sendSoloMailerWaitlistNotification,
  sendLandingPagesWaitlistNotification,
} from "./email";

// Auth middleware for admin routes
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminPassword) {
        console.error("ADMIN_PASSWORD not configured");
        res.status(500).json({ success: false, error: "Server configuration error" });
        return;
      }
      
      if (password === adminPassword) {
        // Regenerate session to prevent session fixation attacks
        req.session.regenerate((err) => {
          if (err) {
            console.error("Session regeneration failed:", err);
            res.status(500).json({ success: false, error: "Login failed" });
            return;
          }
          
          req.session.isAdmin = true;
          res.json({ success: true });
        });
      } else {
        res.status(401).json({ success: false, error: "Invalid password" });
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      res.status(500).json({ 
        success: false, 
        error: "Login failed" 
      });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ success: false, error: "Logout failed" });
      } else {
        res.json({ success: true });
      }
    });
  });

  // Check auth status
  app.get("/api/admin/status", async (req, res) => {
    res.json({ 
      success: true, 
      isAuthenticated: !!(req.session && req.session.isAdmin) 
    });
  });
  // Submit lead (general contact form)
  app.post("/api/submit-lead", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // Send email notification
      await sendLeadNotification(lead);
      
      res.json({ success: true, data: lead });
    } catch (error: any) {
      console.error("Error submitting lead:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to submit lead" 
      });
    }
  });

  // Subscribe to newsletter
  app.post("/api/subscribe-newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);
      
      // Send email notification
      await sendNewsletterNotification(subscriber);
      
      res.json({ success: true, data: subscriber });
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to subscribe" 
      });
    }
  });

  // Request quote
  app.post("/api/request-quote", async (req, res) => {
    try {
      const validatedData = insertPrintQuoteRequestSchema.parse(req.body);
      const request = await storage.createPrintQuoteRequest(validatedData);
      
      // Send email notification
      await sendQuoteRequestNotification(request);
      
      res.json({ success: true, data: request });
    } catch (error: any) {
      console.error("Error requesting quote:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to request quote" 
      });
    }
  });

  // Book consultation
  app.post("/api/book-consultation", async (req, res) => {
    try {
      const validatedData = insertConsultationBookingSchema.parse(req.body);
      const booking = await storage.createConsultationBooking(validatedData);
      
      // Send email notification
      await sendConsultationNotification(booking);
      
      res.json({ success: true, data: booking });
    } catch (error: any) {
      console.error("Error booking consultation:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to book consultation" 
      });
    }
  });

  // Email Marketing Waitlist
  app.post("/api/email-marketing-waitlist", async (req, res) => {
    try {
      const validatedData = insertEmailMarketingWaitlistSchema.parse(req.body);
      const entry = await storage.createEmailMarketingWaitlist(validatedData);
      
      // Send email notification
      await sendEmailMarketingWaitlistNotification(entry);
      
      res.json({ success: true, data: entry });
    } catch (error: any) {
      console.error("Error adding to email marketing waitlist:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to join waitlist" 
      });
    }
  });

  // Print Materials Waitlist
  app.post("/api/print-materials-waitlist", async (req, res) => {
    try {
      const validatedData = insertPrintMaterialsWaitlistSchema.parse(req.body);
      const entry = await storage.createPrintMaterialsWaitlist(validatedData);
      
      // Send email notification
      await sendPrintMaterialsWaitlistNotification(entry);
      
      res.json({ success: true, data: entry });
    } catch (error: any) {
      console.error("Error adding to print materials waitlist:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to join waitlist" 
      });
    }
  });

  // Solo Mailer Waitlist
  app.post("/api/solo-mailer-waitlist", async (req, res) => {
    try {
      const validatedData = insertSoloMailerWaitlistSchema.parse(req.body);
      const entry = await storage.createSoloMailerWaitlist(validatedData);
      
      // Send email notification
      await sendSoloMailerWaitlistNotification(entry);
      
      res.json({ success: true, data: entry });
    } catch (error: any) {
      console.error("Error adding to solo mailer waitlist:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to join waitlist" 
      });
    }
  });

  // Landing Pages Waitlist
  app.post("/api/landing-pages-waitlist", async (req, res) => {
    try {
      const validatedData = insertLandingPagesWaitlistSchema.parse(req.body);
      const entry = await storage.createLandingPagesWaitlist(validatedData);
      
      // Send email notification
      await sendLandingPagesWaitlistNotification(entry);
      
      res.json({ success: true, data: entry });
    } catch (error: any) {
      console.error("Error adding to landing pages waitlist:", error);
      res.status(400).json({ 
        success: false, 
        error: error.message || "Failed to join waitlist" 
      });
    }
  });

  // Admin routes - get all submissions (protected)
  app.get("/api/admin/leads", requireAuth, async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json({ success: true, data: leads });
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch leads" 
      });
    }
  });

  app.get("/api/admin/newsletter-subscribers", requireAuth, async (req, res) => {
    try {
      const subscribers = await storage.getAllNewsletterSubscribers();
      res.json({ success: true, data: subscribers });
    } catch (error: any) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch subscribers" 
      });
    }
  });

  app.get("/api/admin/quote-requests", requireAuth, async (req, res) => {
    try {
      const requests = await storage.getAllPrintQuoteRequests();
      res.json({ success: true, data: requests });
    } catch (error: any) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch quote requests" 
      });
    }
  });

  app.get("/api/admin/consultation-bookings", requireAuth, async (req, res) => {
    try {
      const bookings = await storage.getAllConsultationBookings();
      res.json({ success: true, data: bookings });
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch bookings" 
      });
    }
  });

  app.get("/api/admin/email-marketing-waitlist", requireAuth, async (req, res) => {
    try {
      const entries = await storage.getAllEmailMarketingWaitlist();
      res.json({ success: true, data: entries });
    } catch (error: any) {
      console.error("Error fetching email marketing waitlist:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch waitlist" 
      });
    }
  });

  app.get("/api/admin/print-materials-waitlist", requireAuth, async (req, res) => {
    try {
      const entries = await storage.getAllPrintMaterialsWaitlist();
      res.json({ success: true, data: entries });
    } catch (error: any) {
      console.error("Error fetching print materials waitlist:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch waitlist" 
      });
    }
  });

  app.get("/api/admin/solo-mailer-waitlist", requireAuth, async (req, res) => {
    try {
      const entries = await storage.getAllSoloMailerWaitlist();
      res.json({ success: true, data: entries });
    } catch (error: any) {
      console.error("Error fetching solo mailer waitlist:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch waitlist" 
      });
    }
  });

  app.get("/api/admin/landing-pages-waitlist", requireAuth, async (req, res) => {
    try {
      const entries = await storage.getAllLandingPagesWaitlist();
      res.json({ success: true, data: entries });
    } catch (error: any) {
      console.error("Error fetching landing pages waitlist:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch waitlist" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

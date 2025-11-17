import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertLeadSchema,
  insertNewsletterSubscriberSchema,
  insertPrintQuoteRequestSchema,
  insertConsultationBookingSchema,
} from "@shared/schema";
import {
  sendLeadNotification,
  sendNewsletterNotification,
  sendQuoteRequestNotification,
  sendConsultationNotification,
} from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Admin routes - get all submissions
  app.get("/api/admin/leads", async (req, res) => {
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

  app.get("/api/admin/newsletter-subscribers", async (req, res) => {
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

  app.get("/api/admin/quote-requests", async (req, res) => {
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

  app.get("/api/admin/consultation-bookings", async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}

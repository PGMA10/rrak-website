import { db } from "./db";
import {
  leads,
  newsletterSubscribers,
  printQuoteRequests,
  consultationBookings,
  emailMarketingWaitlist,
  printMaterialsWaitlist,
  soloMailerWaitlist,
  landingPagesWaitlist,
  type Lead,
  type InsertLead,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type PrintQuoteRequest,
  type InsertPrintQuoteRequest,
  type ConsultationBooking,
  type InsertConsultationBooking,
  type EmailMarketingWaitlist,
  type InsertEmailMarketingWaitlist,
  type PrintMaterialsWaitlist,
  type InsertPrintMaterialsWaitlist,
  type SoloMailerWaitlist,
  type InsertSoloMailerWaitlist,
  type LandingPagesWaitlist,
  type InsertLandingPagesWaitlist,
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  // Leads
  createLead(data: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  
  // Newsletter Subscribers
  createNewsletterSubscriber(data: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  
  // Print Quote Requests
  createPrintQuoteRequest(data: InsertPrintQuoteRequest): Promise<PrintQuoteRequest>;
  getAllPrintQuoteRequests(): Promise<PrintQuoteRequest[]>;
  
  // Consultation Bookings
  createConsultationBooking(data: InsertConsultationBooking): Promise<ConsultationBooking>;
  getAllConsultationBookings(): Promise<ConsultationBooking[]>;
  
  // Email Marketing Waitlist
  createEmailMarketingWaitlist(data: InsertEmailMarketingWaitlist): Promise<EmailMarketingWaitlist>;
  getAllEmailMarketingWaitlist(): Promise<EmailMarketingWaitlist[]>;
  
  // Print Materials Waitlist
  createPrintMaterialsWaitlist(data: InsertPrintMaterialsWaitlist): Promise<PrintMaterialsWaitlist>;
  getAllPrintMaterialsWaitlist(): Promise<PrintMaterialsWaitlist[]>;
  
  // Solo Mailer Waitlist
  createSoloMailerWaitlist(data: InsertSoloMailerWaitlist): Promise<SoloMailerWaitlist>;
  getAllSoloMailerWaitlist(): Promise<SoloMailerWaitlist[]>;
  
  // Landing Pages Waitlist
  createLandingPagesWaitlist(data: InsertLandingPagesWaitlist): Promise<LandingPagesWaitlist>;
  getAllLandingPagesWaitlist(): Promise<LandingPagesWaitlist[]>;
}

export class PostgresStorage implements IStorage {
  // Leads
  async createLead(data: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(data).returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  // Newsletter Subscribers
  async createNewsletterSubscriber(data: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [subscriber] = await db.insert(newsletterSubscribers).values(data).returning();
    return subscriber;
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  // Print Quote Requests
  async createPrintQuoteRequest(data: InsertPrintQuoteRequest): Promise<PrintQuoteRequest> {
    const [request] = await db.insert(printQuoteRequests).values(data).returning();
    return request;
  }

  async getAllPrintQuoteRequests(): Promise<PrintQuoteRequest[]> {
    return db.select().from(printQuoteRequests).orderBy(desc(printQuoteRequests.createdAt));
  }

  // Consultation Bookings
  async createConsultationBooking(data: InsertConsultationBooking): Promise<ConsultationBooking> {
    const [booking] = await db.insert(consultationBookings).values(data).returning();
    return booking;
  }

  async getAllConsultationBookings(): Promise<ConsultationBooking[]> {
    return db.select().from(consultationBookings).orderBy(desc(consultationBookings.createdAt));
  }

  // Email Marketing Waitlist
  async createEmailMarketingWaitlist(data: InsertEmailMarketingWaitlist): Promise<EmailMarketingWaitlist> {
    const [entry] = await db.insert(emailMarketingWaitlist).values(data).returning();
    return entry;
  }

  async getAllEmailMarketingWaitlist(): Promise<EmailMarketingWaitlist[]> {
    return db.select().from(emailMarketingWaitlist).orderBy(desc(emailMarketingWaitlist.createdAt));
  }

  // Print Materials Waitlist
  async createPrintMaterialsWaitlist(data: InsertPrintMaterialsWaitlist): Promise<PrintMaterialsWaitlist> {
    const [entry] = await db.insert(printMaterialsWaitlist).values(data).returning();
    return entry;
  }

  async getAllPrintMaterialsWaitlist(): Promise<PrintMaterialsWaitlist[]> {
    return db.select().from(printMaterialsWaitlist).orderBy(desc(printMaterialsWaitlist.createdAt));
  }

  // Solo Mailer Waitlist
  async createSoloMailerWaitlist(data: InsertSoloMailerWaitlist): Promise<SoloMailerWaitlist> {
    const [entry] = await db.insert(soloMailerWaitlist).values(data).returning();
    return entry;
  }

  async getAllSoloMailerWaitlist(): Promise<SoloMailerWaitlist[]> {
    return db.select().from(soloMailerWaitlist).orderBy(desc(soloMailerWaitlist.createdAt));
  }

  // Landing Pages Waitlist
  async createLandingPagesWaitlist(data: InsertLandingPagesWaitlist): Promise<LandingPagesWaitlist> {
    const [entry] = await db.insert(landingPagesWaitlist).values(data).returning();
    return entry;
  }

  async getAllLandingPagesWaitlist(): Promise<LandingPagesWaitlist[]> {
    return db.select().from(landingPagesWaitlist).orderBy(desc(landingPagesWaitlist.createdAt));
  }
}

export const storage = new PostgresStorage();

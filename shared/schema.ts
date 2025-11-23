import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Leads table - general contact form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  businessName: varchar("business_name", { length: 255 }),
  serviceInterest: varchar("service_interest", { length: 255 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  subscribedAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Print quote requests table
export const printQuoteRequests = pgTable("print_quote_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  businessName: varchar("business_name", { length: 255 }),
  materialType: varchar("material_type", { length: 255 }),
  quantity: varchar("quantity", { length: 100 }),
  timeline: varchar("timeline", { length: 255 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPrintQuoteRequestSchema = createInsertSchema(printQuoteRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export type InsertPrintQuoteRequest = z.infer<typeof insertPrintQuoteRequestSchema>;
export type PrintQuoteRequest = typeof printQuoteRequests.$inferSelect;

// Consultation bookings table
export const consultationBookings = pgTable("consultation_bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  serviceType: varchar("service_type", { length: 255 }),
  preferredTime: varchar("preferred_time", { length: 255 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConsultationBookingSchema = createInsertSchema(consultationBookings).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export type InsertConsultationBooking = z.infer<typeof insertConsultationBookingSchema>;
export type ConsultationBooking = typeof consultationBookings.$inferSelect;

// Email Marketing Waitlist table
export const emailMarketingWaitlist = pgTable("email_marketing_waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  businessName: varchar("business_name", { length: 255 }),
  serviceTypes: text("service_types").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmailMarketingWaitlistSchema = createInsertSchema(emailMarketingWaitlist).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  businessName: z.string().optional(),
  serviceTypes: z.array(z.string()).optional(),
});

export type InsertEmailMarketingWaitlist = z.infer<typeof insertEmailMarketingWaitlistSchema>;
export type EmailMarketingWaitlist = typeof emailMarketingWaitlist.$inferSelect;

// Print Materials Waitlist table
export const printMaterialsWaitlist = pgTable("print_materials_waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  businessName: varchar("business_name", { length: 255 }),
  materialTypes: text("material_types").array(),
  otherMaterialType: varchar("other_material_type", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  quantity: varchar("quantity", { length: 100 }),
  typicalNeed: varchar("typical_need", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPrintMaterialsWaitlistSchema = createInsertSchema(printMaterialsWaitlist).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  businessName: z.string().optional(),
  materialTypes: z.array(z.string()).min(1, "Please select at least one material type"),
  otherMaterialType: z.string().optional(),
  industry: z.string().optional(),
  quantity: z.string().optional(),
  typicalNeed: z.string().optional(),
});

export type InsertPrintMaterialsWaitlist = z.infer<typeof insertPrintMaterialsWaitlistSchema>;
export type PrintMaterialsWaitlist = typeof printMaterialsWaitlist.$inferSelect;

// Solo Mailer Waitlist table
export const soloMailerWaitlist = pgTable("solo_mailer_waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  businessName: varchar("business_name", { length: 255 }),
  interestAreas: text("interest_areas").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSoloMailerWaitlistSchema = createInsertSchema(soloMailerWaitlist).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  businessName: z.string().optional(),
  interestAreas: z.array(z.string()).optional(),
});

export type InsertSoloMailerWaitlist = z.infer<typeof insertSoloMailerWaitlistSchema>;
export type SoloMailerWaitlist = typeof soloMailerWaitlist.$inferSelect;

// Landing Pages Waitlist table
export const landingPagesWaitlist = pgTable("landing_pages_waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  businessName: varchar("business_name", { length: 255 }),
  interestAreas: text("interest_areas").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLandingPagesWaitlistSchema = createInsertSchema(landingPagesWaitlist).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  businessName: z.string().optional(),
  interestAreas: z.array(z.string()).optional(),
});

export type InsertLandingPagesWaitlist = z.infer<typeof insertLandingPagesWaitlistSchema>;
export type LandingPagesWaitlist = typeof landingPagesWaitlist.$inferSelect;

// Blog Posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
  publishedAt: z.date().nullable().optional(),
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Campaign Settings table
export const campaignSettings = pgTable("campaign_settings", {
  id: serial("id").primaryKey(),
  deadlineDate: timestamp("deadline_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCampaignSettingSchema = createInsertSchema(campaignSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  deadlineDate: z.date(),
});

export type InsertCampaignSetting = z.infer<typeof insertCampaignSettingSchema>;
export type CampaignSetting = typeof campaignSettings.$inferSelect;

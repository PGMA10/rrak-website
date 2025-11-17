import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add your API routes here
  // Prefix all routes with /api

  const httpServer = createServer(app);

  return httpServer;
}

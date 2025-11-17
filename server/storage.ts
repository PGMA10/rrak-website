// Storage interface for your application
// Add CRUD methods as needed

export interface IStorage {
  // Add your storage methods here
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage
  }
}

export const storage = new MemStorage();

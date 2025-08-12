import { Router } from 'express';

// Placeholder type for schema data
interface SchemaData {
  models: any[];
  enums: any[];
}

export function createRouter(schemaData: SchemaData) {
  const router = Router();

  // TODO: Implement dynamic routes per model with CRUD handlers

  router.get('/__health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), version: '0.1.0' });
  });

  router.get('/__schema', (req, res) => {
    res.json(schemaData);
  });

  return router;
}

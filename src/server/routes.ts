// server/routes.ts
import { Router } from "express";
import { SchemaData } from "../schema/loader";
import { eventNames, uptime } from "process";

export type MockData = Record<string, any[]>; // { User: [...], Post: [...] }

/**
 * Creates an Express router exposing health, schema, and CRUD endpoints.
 * Works with either parsed Prisma schema metadata OR generated mock data.
 */
export function createRouter(schemaData: SchemaData | MockData) {
  const router = Router();

  // Health check
  router.get("/__health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime(), version: "0.1.0" });
  });

  // Expose schema or mock data
  router.get("/__schema", (req, res) => {
    res.json(schemaData);
  });

  // Only generate CRUD routes for MockData
  if (isMockData(schemaData)) {
    Object.entries(schemaData).forEach(([modelName, collection]) => {
      const basePath = `/${modelName.toLowerCase()}`;

      router.get(basePath, (req, res) => res.json(collection));
      router.get(`${basePath}/:id`, (req, res) => {
        const item = collection.find((el) => String(el.id) === req.params.id);
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      });
      router.post(basePath, (req, res) => {
        const newItem = { id: collection.length + 1, ...req.body };
        collection.push(newItem);
        res.status(201).json(newItem);
      });
      router.put(`${basePath}/:id`, (req, res) => {
        const idx = collection.findIndex((el) => String(el.id) === req.params.id);
        if (idx === -1) return res.status(404).json({ error: "Not found" });
        collection[idx] = { ...collection[idx], ...req.body };
        res.json(collection[idx]);
      });
      router.delete(`${basePath}/:id`, (req, res) => {
        const idx = collection.findIndex((el) => String(el.id) === req.params.id);
        if (idx === -1) return res.status(404).json({ error: "Not found" });
        const [deleted] = collection.splice(idx, 1);
        res.json(deleted);
      });
    });
  }

  return router;
}

/** Type guard to detect MockData */
function isMockData(data: SchemaData | MockData): data is MockData {
  // MockData is a record of arrays
  return Object.values(data).every((val) => Array.isArray(val));
}

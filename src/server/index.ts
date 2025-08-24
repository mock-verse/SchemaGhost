// server/index.ts
import express, { Express } from "express";
import { createRouter } from "./routes";
import { loadSchema, SchemaData } from "../schema/loader";

export type MockData = Record<string, any[]>; // e.g., { User: [...], Post: [...] }

export interface ServeOptions {
  schemaPath: string;
  port: number;
  data?: MockData; // optional pre-generated mock data
}

export async function serve(options: ServeOptions) {
  const app: Express = express();
  app.use(express.json()); // parse JSON bodies

  // Load schema or use pre-generated mock data
  let schemaData: SchemaData | MockData;

  if (options.data) {
    schemaData = options.data; // MockData from CLI
  } else {
    schemaData = await loadSchema(options.schemaPath); // SchemaData
  }

  // Example: safely access raw Prisma schema string only if it exists
  if (isSchemaData(schemaData)) {
    console.log("✅ Loaded schema string length:", schemaData.raw.length);
  }

  // Create Express router dynamically based on schema or mock data
  const router = createRouter(schemaData);
  app.use("/api", router);

  // Start server
  app.listen(options.port, () => {
    console.log(
      `🚀 SchemaGhost server running at http://localhost:${options.port}/api`
    );
  });
}

/** Type guard to detect SchemaData */
function isSchemaData(data: SchemaData | MockData): data is SchemaData {
  return (data as SchemaData).raw !== undefined;
}

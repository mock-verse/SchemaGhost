// src/schema/parser.ts
import { ModelData, EnumData, SchemaData } from "./loader";

export interface ParsedSchema {
  models: ModelData[];
  enums: EnumData[];
}

/**
 * Parses raw Prisma schema string into models and enums.
 * Currently, it simply returns the same models/enums from SchemaData.
 */
export function parseSchema(raw: string): ParsedSchema {
  // For now, just return empty arrays if parsing not implemented yet
  return {
    models: [], // later we can implement real parsing
    enums: [],
  };
}

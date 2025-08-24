// schema/loader.ts
import { readFile } from "fs/promises";

/**
 * Representation of a Prisma model field
 */
export interface ModelField {
  name: string;
  type: string;
  isOptional: boolean;
  isId: boolean;
}

/**
 * Representation of a Prisma model
 */
export interface ModelData {
  name: string;
  fields: ModelField[];
}

/**
 * Representation of a Prisma enum
 */
export interface EnumData {
  name: string;
  values: string[];
}

/**
 * Structured representation of a Prisma schema.
 */
export interface SchemaData {
  raw: string;         // full Prisma schema string
  models: ModelData[]; // parsed models
  enums: EnumData[];   // parsed enums
}

/**
 * Load a Prisma schema file and return structured schema data.
 * This simple parser extracts model and enum names and fields.
 */
export async function loadSchema(path: string): Promise<SchemaData> {
  const raw = await readFile(path, "utf-8");

  const models: ModelData[] = [];
  const enums: EnumData[] = [];

  const lines = raw.split(/\r?\n/);
  let currentModel: ModelData | null = null;
  let currentEnum: EnumData | null = null;

  for (let line of lines) {
    line = line.trim();

    // Skip empty lines or comments
    if (!line || line.startsWith("//")) continue;

    // Detect model start
    if (line.startsWith("model ")) {
      const name = line.split(" ")[1];
      currentModel = { name, fields: [] };
      models.push(currentModel);
      continue;
    }

    // Detect enum start
    if (line.startsWith("enum ")) {
      const name = line.split(" ")[1];
      currentEnum = { name, values: [] };
      enums.push(currentEnum);
      continue;
    }

    // Detect end of model or enum
    if (line === "}") {
      currentModel = null;
      currentEnum = null;
      continue;
    }

    // Parse model fields
    if (currentModel) {
      const parts = line.split(/\s+/);
      const fieldName = parts[0];
      const fieldType = parts[1];
      const isOptional = fieldType.endsWith("?");
      const isId = parts.includes("@id");
      currentModel.fields.push({
        name: fieldName,
        type: fieldType.replace("?", ""),
        isOptional,
        isId,
      });
    }

    // Parse enum values
    if (currentEnum) {
      if (line !== "{") {
        currentEnum.values.push(line.replace(",", ""));
      }
    }
  }

  return { raw, models, enums };
}

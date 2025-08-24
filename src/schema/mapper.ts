// src/schema/mapper.ts
import { ParsedSchema } from "./parser";
import { ModelData, EnumData } from "./loader";

export interface MappedSchema {
  models: ModelData[];
  enums: EnumData[];
}

/**
 * Maps a parsed schema into the structure required by generateData.
 * Always ensures models & enums are arrays.
 */
export function mapSchema(parsed: ParsedSchema): MappedSchema {
  return {
    models: parsed.models || [],
    enums: parsed.enums || [],
  };
}

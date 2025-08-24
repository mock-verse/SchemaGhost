// src/generate/factory.ts
import { MappedSchema } from "../schema/mapper";

export type MockData = Record<string, any[]>;

export function generateData(
  mappedSchema: MappedSchema,
  options: { count: number; depth: number }
): MockData {
  const data: MockData = {};

  for (const model of mappedSchema.models) {
    const items = [];
    for (let i = 0; i < options.count; i++) {
      const item: Record<string, any> = {};

      // Generate mock values for each field
      for (const field of model.fields) {
        if (field.type === "String") {
          item[field.name] = `${field.name}_${i + 1}`;
        } else if (field.type === "Int") {
          item[field.name] = i + 1;
        } else if (field.type === "Boolean") {
          item[field.name] = i % 2 === 0;
        } else {
          // default fallback
          item[field.name] = null;
        }
      }

      items.push(item);
    }

    data[model.name] = items;
  }

  return data;
}

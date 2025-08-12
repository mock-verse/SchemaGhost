import fs from 'fs/promises';


export async function loadSchema(schemaPath: string) {
  const schemaRaw = await fs.readFile(schemaPath, 'utf-8');
  // TODO: parse schema.prisma to structured data
  return {
    raw: schemaRaw,
    models: [],   // stub empty array
    enums: []     // stub empty array
  };
}

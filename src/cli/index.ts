#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import fs from "fs";
import { serve } from "../server";
import { loadSchema, SchemaData } from "../schema/loader";
import { parseSchema } from "../schema/parser";
import { mapSchema } from "../schema/mapper";
import { generateData } from "../generate/factory";

const program = new Command();

program
  .name("schemaghost")
  .description("Schema-aware mock API generator")
  .option(
    "-s, --schema <path>",
    "Path to Prisma schema file",
    fs.existsSync("./prisma/schema.prisma")
      ? "./prisma/schema.prisma"
      : "./examples/schema.prisma"
  )
  .option("-p, --port <number>", "Port to run server on", "8080")
  .option("-c, --count <number>", "Number of records per model", "10")
  .option("-o, --output <file>", "Write mock data to JSON instead of serving")
  .option("-a, --adapter <name>", "Adapter (server|mirage|msw)", "server")
  .option("-d, --depth <number>", "Relation depth for nested data", "1");

// --- show help if no arguments ---
if (process.argv.length <= 2) {
  program.help(); // prints help and exits
}

program.parse(process.argv);

async function main() {
  const opts = program.opts();

  // 1. Resolve schema path
  const schemaPath = path.resolve(process.cwd(), opts.schema);

  // 2. Load Prisma schema
  const schemaData = await loadSchema(schemaPath);

  // 3. Parse + map schema
  const parsed = parseSchema(schemaData.raw);
  const mapped = mapSchema(parsed);

  // 4. Generate mock data
  const data = generateData(mapped, {
    count: parseInt(opts.count, 10),
    depth: parseInt(opts.depth, 10),
  });

  // 5. Output or serve
  if (opts.output) {
    fs.writeFileSync(opts.output, JSON.stringify(data, null, 2));
    console.log(`✅ Mock data written to ${opts.output}`);
  } else if (opts.adapter === "server") {
    serve({
      schemaPath,
      port: Number(opts.port),
      data, // MockData
    });
  } else if (opts.adapter === "mirage" || opts.adapter === "msw") {
    console.log(`⚡ Adapter "${opts.adapter}" not fully implemented yet.`);
  } else {
    console.error(`❌ Unknown adapter: ${opts.adapter}`);
  }
}

main().catch((err) => {
  console.error("❌ CLI Error:", err);
  process.exit(1);
});

// CLI entry point
import { Command } from 'commander';
import { serve } from '../server';

const program = new Command();

program
  .command('serve')
  .description('Start SchemaGhost mock API server')
  .option('--schema <path>', 'Path to Prisma schema file', './examples/schema.prisma')
  .option('--port <number>', 'Port to run server on', '8080')
  .action(({ schema, port }) => {
    serve({ schemaPath: schema, port: Number(port) });
  });

program.parse(process.argv);

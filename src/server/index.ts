import express from 'express';
import { loadSchema } from '../schema/loader';
import { createRouter } from './routes';

interface ServeOptions {
  schemaPath: string;
  port: number;
}

export async function serve(options: ServeOptions) {
  const app = express();
  app.use(express.json());

  const schemaData = await loadSchema(options.schemaPath);
  const router = createRouter(schemaData);

  app.use('/api', router);

  app.listen(options.port, () => {
    console.log(`SchemaGhost server running at http://localhost:${options.port}/api`);
  });
}

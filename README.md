

# SchemaGhost


> Instantly generate a fake API server from your Prisma or database schema.  
> Develop faster with realistic mock APIs — no backend required.



---

## What is SchemaGhost?

SchemaGhost is a developer tool that reads your Prisma or database schema and instantly spins up a fully mocked REST API server.  
No need to build a backend or write mocks by hand — SchemaGhost understands your data models and relations, serving realistic fake data out of the box.

---

## Key Features

- Schema-aware: Parses Prisma schemas, understands models, fields, and relations  
- Auto API generation: RESTful endpoints for all models generated dynamically  
- Realistic mock data: Uses smart faker logic for each field type  
- Relations & nested data: Handles one-to-many, many-to-many, and nested fetches  
- Configurable: Customize mock data generation rules with simple config files  
- Zero setup: Just point it to your schema and start developing instantly  
- Supports multiple schemas: Work on monorepos or multiple projects easily  
- Fast & lightweight: Minimal dependencies, perfect for local dev and testing

---

## Installation

```bash
npm install -g schemaghost

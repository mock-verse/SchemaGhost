# SchemaGhost

![npm](https://img.shields.io/npm/v/schemaghost)
![License](https://img.shields.io/npm/l/schemaghost)
![Downloads](https://img.shields.io/npm/dt/schemaghost)
[![npm version](https://img.shields.io/npm/v/schemaghost.svg)](https://www.npmjs.com/package/schemaghost)


Instantly generate a fake API server from your Prisma or database schema. Develop faster with realistic mock APIs — **no backend required**.

---

##  What is SchemaGhost?

SchemaGhost is a developer tool that reads your Prisma or database schema and instantly spins up a fully mocked **REST API server**.

No need to build a backend or write mocks by hand — SchemaGhost understands your data models and relations, serving realistic fake data out of the box.

---

##  Features

* **Schema-aware** → Parses Prisma schemas, understands models, fields, and relations.
* **Auto API generation** → RESTful endpoints for all models generated dynamically.
* **Realistic mock data** → Uses smart faker logic for each field type.
* **Relations & nesting** → Handles one-to-many, many-to-many, and nested fetches.
* **Configurable** → Customize mock data generation rules with simple config files.
* **Zero setup** → Just point it to your schema and start developing instantly.
* **Multiple schema support** → Work on monorepos or multiple projects easily.
* **Fast & lightweight** → Minimal dependencies, perfect for local dev and testing.

---

##  Installation

```bash
npm install -g schemaghost
```

---

##  Usage

```bash
schemaghost --schema ./prisma/schema.prisma --port 8080
```

This will instantly generate REST endpoints for all your models, e.g.:

```
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

All endpoints serve **realistic mock data**.

---

## 🛠 Configuration

You can override default mock data generation with a simple config file (`mock-config.js`):

```js
module.exports = {
  User: {
    name: () => `User_${Math.floor(Math.random() * 1000)}`,
    email: () => `user${Math.floor(Math.random() * 1000)}@example.com`,
  },
};
```

Run SchemaGhost with the config:

```bash
schemaghost --schema ./prisma/schema.prisma --mock-config ./mock-config.js
```

---

##  Examples

### Nested Relations

If you have a `Post` model with a relation to `User`, you can fetch nested data:

```
GET /posts
```

Response:

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "author": {
      "id": 1,
      "name": "User_42"
    }
  }
]
```

### Multiple Schemas

Work on monorepos or multiple projects:

```bash
schemaghost --schema ./apps/api/prisma/schema.prisma
schemaghost --schema ./libs/shared/prisma/schema.prisma
```

---

##  CLI Options

| Option                 | Description                        | Default                  |
| ---------------------- | ---------------------------------- | ------------------------ |
| `-s, --schema <path>`  | Path to your Prisma schema         | `./prisma/schema.prisma` |
| `-p, --port <number>`  | Port to run the API server         | `8080`                   |
| `-c, --count <number>` | Number of records per model        | `10`                     |
| `-o, --output <file>`  | Save generated mock data to a file | None                     |
| `--mock-config <file>` | Path to custom mock config         | None                     |

---

##  Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/schemaghost.git
cd schemaghost
npm install
```

Run locally:

```bash
npm link
schemaghost --schema ./examples/schema.prisma
```

---

##  License

SchemaGhost is licensed under BSL-1.1.

---

## 🔗 Links

* [NPM Package](https://www.npmjs.com/package/schemaghost)
* [GitHub Repository](https://github.com/mockilo/schemaghost)

# PokeIQ

> A web application that tests Pokémon players' knowledge through interactive quizzes — helping trainers memorize Type Advantages and other key battle mechanics.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![DynamoDB](https://img.shields.io/badge/AWS-DynamoDB-4053D6?logo=amazon-dynamodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites-for-local-development)
- [Setup and Installation](#setup-and-installation)
- [Database Schema](#database-schema)
- [Seeding](#seeding)
- [API Reference](#api-reference)
- [Documentation](#documentation)

---

## Overview

PokeIQ is a web application meant to challenge players with Pokémon knowledge quizzes.

Data is sourced from [PokeAPI](https://pokeapi.co/)

---

## Features

- [Current WIP] **Damage Relations Quiz** — Drag-and-drop for categorizing Type matchups
- [🚧] **Who's that Pokemon Quiz** - Guess the Pokemon based on a silhoutte
---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React DnD, React Bootstrap|
| **Backend** | Node.js, Express |
| **Database** | AWS DynamoDB (AWS SDK v3) |
| **Infrastructure** | Docker, Docker Compose |
| **Dev Tools** | Storybook, JSDoc |

---

## Prerequisites for local development

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/)
- An AWS account with:
  - Two DynamoDB tables created (see [Database Schema](#database-schema))
  - An IAM user with `AmazonDynamoDBFullAccess` (or scoped read/write permissions) and access keys

---

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/btruong178/PokeIQ.git
cd PokeIQ
```

### 2. Create the environment file

Create a file named `.env.backend` in the **project root**. Docker Compose will automatically load it for the backend container.

See [Database Schema](#database-schema) for table names

Set up an IAM user with the permissions to access DynamoDB & other necessary AWS services

```env
PORT=80
DYNAMODB_TABLE_NAME_POKEMON=YourPokemonTableName
DYNAMODB_TABLE_NAME_TYPES=YourTypesTableName
AWS_ACCESS_KEY_ID=YourAWSAccessKeyId
AWS_SECRET_ACCESS_KEY=YourAWSSecretAccessKey
AWS_REGION=your-aws-region
```

> See `.env.example` for reference.

### 3. Run with Docker (Recommended)

**First run** — build images and start containers:
```bash
npm run docker:dev:build
```

**Subsequent runs** — start without rebuilding:
```bash
npm run docker:dev
```

**Stop containers:**
```bash
npm run docker:down
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:80 |

---

## Database Schema

Data is populated from [PokeAPI](https://pokeapi.co/).

### Table: `pokemon`

Stores individual Pokémon records.

| Attribute | Type | Key |
|---|---|---|
| `id` | Number | Partition key |
| `name` | String | e.g. `"Bulbasaur"`|
| `type` | String | e.g. `"Grass/Poison"` |

**Example item:**
```json
{
  "id": 1,
  "name": "Bulbasaur",
  "type": "Grass/Poison"
}
```

### Table: `types`

Stores Type matchup data (damage relations) for each of the 18 Pokémon types.

| Attribute | Type | Key |
|---|---|---|
| `name` | String | Partition key |
| `id` | Number | |
| `damage_relations` | Map | |

**Example item:**
```json
{
  "id": 10,
  "name": "fire",
  "damage_relations": {
    "double_damage_from": [
      { "name": "ground", "url": "https://pokeapi.co/api/v2/type/5/" },
      { "name": "rock",   "url": "https://pokeapi.co/api/v2/type/6/" },
      { "name": "water",  "url": "https://pokeapi.co/api/v2/type/11/" }
    ],
    "double_damage_to": [
      { "name": "bug",   "url": "https://pokeapi.co/api/v2/type/7/" },
      { "name": "steel", "url": "https://pokeapi.co/api/v2/type/9/" },
      { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" },
      { "name": "ice",   "url": "https://pokeapi.co/api/v2/type/15/" }
    ],
    "half_damage_from": [
      { "name": "bug",   "url": "https://pokeapi.co/api/v2/type/7/" },
      { "name": "steel", "url": "https://pokeapi.co/api/v2/type/9/" },
      { "name": "fire",  "url": "https://pokeapi.co/api/v2/type/10/" },
      { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" },
      { "name": "ice",   "url": "https://pokeapi.co/api/v2/type/15/" },
      { "name": "fairy", "url": "https://pokeapi.co/api/v2/type/18/" }
    ],
    "half_damage_to": [
      { "name": "rock",   "url": "https://pokeapi.co/api/v2/type/6/" },
      { "name": "fire",   "url": "https://pokeapi.co/api/v2/type/10/" },
      { "name": "water",  "url": "https://pokeapi.co/api/v2/type/11/" },
      { "name": "dragon", "url": "https://pokeapi.co/api/v2/type/16/" }
    ],
    "no_damage_from": [],
    "no_damage_to":   []
  }
}
```

---

## Seeding

Prerequisites:
- The "pokemon" and "types" table should be created with the correct schema
- Environment variables should be filled out in the "env.backend" file including IAM user credentials

Seed scripts fetch data from the PokeAPI and write it to DynamoDB. They must be run from within the backend package after the `.env.backend` variables are available in your environment.

> If not done already, build the images:
> ```bash
> npm run docker:dev:build
> ```

> Ensure containers are running:
> ```bash
> npm run docker:dev
> ```

> Scripts must be run within the backend container:
> ```bash
> npm run docker:exec:backend
> ```

Then run the seed commands below from inside the container.

### Seed Pokémon data

```bash
npm run dynamodb:seed:pokemon
```

An interactive CLI will prompt you to:
1. **Seed** — choose a start and end Pokémon ID (1–1025)
2. **Batch Delete** — remove a range of Pokémon by ID
3. **Get** — fetch a single Pokémon by ID

### Seed Type damage relations

```bash
npm run dynamodb:seed:dmg
```

An interactive CLI will prompt you to:
1. **Seed** — fetches all 18 types from PokeAPI and writes them to the types table
2. **Get** — fetch a single type by name (e.g. `fire`)
3. **Batch Delete** — remove all type records from the table

---

## API Reference

### DynamoDB

Routes are mounted under `/dynamoDB-api`. The backend runs on port `80`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dynamoDB-api/health-check` | Verify DynamoDB connectivity |
| `GET` | `/dynamoDB-api/random-pokemon` | Return a random Pokémon (ID 1–1025) |
| `GET` | `/dynamoDB-api/damage-relations/:type` | Return damage relations for a given type name (e.g. `fire`) |

**Example responses:**

`GET /dynamoDB-api/random-pokemon`
```json
{
  "status": "success",
  "item": { "id": 25, "name": "Pikachu", "type": "Electric" }
}
```
`GET /dynamoDB-api/damage-relations/fire`

- [Damage Relations structure](#database-schema)
```json
{
  "status": "success",
  "item": {
    "id": 10,
    "name": "fire",
    "damage_relations": {"..."}
  }
}
```

---

## Documentation

### JSDoc

```bash
npm run jsdocs
```
Generated docs are output to the `docs/` directory

There are separate docs for both front and back end:
- `docs/frontend/index.html`
- `docs/backend/index.html`

### Storybook

```bash
npm run storybook
```
Browse React Compoenents in Isolation

Storybook runs on http://localhost:6006.
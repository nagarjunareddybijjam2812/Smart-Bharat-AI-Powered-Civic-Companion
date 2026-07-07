-- CitizenAI PostgreSQL init script
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create shadow DB for Prisma migrations
CREATE DATABASE citizenai_shadow;
GRANT ALL PRIVILEGES ON DATABASE citizenai_shadow TO citizenai;

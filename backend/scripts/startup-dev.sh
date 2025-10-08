#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting server with nodemon (hot-reload)..."
npm run dev
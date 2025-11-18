# Base stage - shared dependencies
FROM node:20 AS base
WORKDIR /app/backend
COPY . .
RUN npm ci

# Development stage
FROM base AS development
EXPOSE 80
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
EXPOSE 80
CMD ["npm", "start"]
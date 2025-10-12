# Base stage - shared dependencies
FROM node:20 AS base
WORKDIR /app/backend
COPY . .
RUN npm ci

# Development stage
FROM base AS development
RUN chmod +x scripts/startup-dev.sh
EXPOSE 5001
CMD ["./scripts/startup-dev.sh"]

# Production stage
FROM base AS production
RUN chmod +x scripts/startup.sh
EXPOSE 5001
CMD ["./scripts/startup.sh"]
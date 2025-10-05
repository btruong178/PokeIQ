# Build stage
FROM node:20
WORKDIR /app/backend
COPY . .
RUN npm ci
RUN npx prisma generate

# Runtime configuration
EXPOSE 5001
CMD ["npm", "start"]
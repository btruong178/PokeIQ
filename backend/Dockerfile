# Build stage
FROM node:20
WORKDIR /app/backend
COPY . .
RUN npm ci

# Runtime configuration
EXPOSE 5001
CMD ["npm", "start"]
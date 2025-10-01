# Build stage
FROM node:20
WORKDIR /app/frontend
COPY . .
RUN npm ci

# Runtime configuration
EXPOSE 3000
CMD ["npm", "start"]

FROM node:20

WORKDIR /app/backend
COPY . .

RUN npm install
RUN npm install prisma --save-dev

EXPOSE 5001


CMD ["npm", "start"]
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY . .

FROM base AS development
RUN npm install --only=development
CMD ["npm", "run", "start"]

FROM base AS production
CMD ["node", "dist/main.js"]

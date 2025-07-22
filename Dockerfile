FROM node:18-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json backend/tsconfig.json ./
RUN npm ci

COPY backend/src/ src/
RUN npm run build

CMD ["node", "dist/main.js"]

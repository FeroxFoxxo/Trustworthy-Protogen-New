FROM node:20-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN useradd -m -u 10001 appuser
USER appuser

ENV NODE_ENV=production

CMD ["node", "index.js"]

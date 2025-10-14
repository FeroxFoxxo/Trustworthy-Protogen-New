FROM node:20-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV DATA_DIR=/data
RUN mkdir -p ${DATA_DIR}

RUN useradd -m -u 10001 appuser \
  && chown -R appuser:appuser /usr/src/app ${DATA_DIR}
USER appuser

ENV NODE_ENV=production \
    TOKEN= \
    BLOCKED_USERS= \
    WOLFRAM_API= \
    GEMINI_API=

CMD ["node", "index.js"]

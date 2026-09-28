FROM node:alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production --ignore-scripts

FROM node:alpine AS runner

WORKDIR /app

ENV API_HOST=0.0.0.0
ENV API_PORT=8080
ENV API_PROTOCOL=http

RUN addgroup -g 1001 -S nodejs
RUN adduser -S app -u 1001

COPY --from=dependencies /app/node_modules ./node_modules
COPY src ./src

USER app

EXPOSE 8080

CMD ["node", "src/index.js"]

FROM node:20-slim AS build

WORKDIR /app

COPY /vulnapp/package*.json ./

RUN npm install

COPY vulnapp/ ./

EXPOSE 3000

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 3000

CMD ["node", "server.js"]

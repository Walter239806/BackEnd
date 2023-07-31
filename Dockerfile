FROM node:latest AS build
RUN apt-get install -y --no-install-recommends curl bash
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
RUN npm prune --production && node-prune

FROM node:18-alpine3.17
RUN apk add dumb-init
WORKDIR /usr/src/app
ENV NODE_ENV production
USER node
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node ./src .
CMD ["dumb-init", "node", "main.js"]

FROM node:latest AS build
RUN apt-get install -y --no-install-recommends curl bash
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
RUN npm prune --production && node-prune

FROM node:20-alpine3.17
RUN apk add dumb-init
WORKDIR /usr/src/app

ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG JWT_SECRET

ENV APP_NAME=blog-api
ENV APP_VERSION=1.0.0
ENV NODE_ENV=production
ENV NODE_PORT=3001
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV JWTSecret=${JWT_SECRET}

USER node

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./src .

CMD ["dumb-init", "node", "main.js"]

# docker build . -t nodejslabs --build-arg DB_USERNAME=walter --build-arg DB_PASSWORD=Batico11 --build-arg DB_NAME=blog     --build-arg JWT_SECRERT=Welcome123456
# docker run --rm --name backend  -p 3001:3001 nodejslabs


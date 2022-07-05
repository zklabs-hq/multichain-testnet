FROM node:16-slim AS build

ARG SVC_PORT

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY index.js ./index.js

ENV PORT=${SVC_PORT}

CMD [ "node", "index.js" ]

EXPOSE ${SVC_PORT}
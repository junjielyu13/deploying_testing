FROM node:alpine

WORKDIR /frontend

COPY VinylHub/package.json .
COPY VinylHub/package-lock.json .

RUN npm install
COPY VinylHub .
# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /usr/src/app
COPY ./server/package*.json ./
RUN npm ci
COPY . .
EXPOSE 3001
WORKDIR /usr/src/app/server
CMD ["npm", "start"]

# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./build .
EXPOSE 3000
CMD ["serve", "build"]

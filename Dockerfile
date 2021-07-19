FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
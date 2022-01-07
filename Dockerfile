# FROM node:14-alpine AS production
# ENV NODE_ENV production
# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD [ "npm", "start" ]

FROM node:14-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY domain.crt /etc/nginx/
COPY domain.key /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
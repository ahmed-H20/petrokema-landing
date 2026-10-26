# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_BASE_URL=https://api.petrokema.tech/api/v1
ARG VITE_SERVER_URL=https://api.petrokema.tech
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

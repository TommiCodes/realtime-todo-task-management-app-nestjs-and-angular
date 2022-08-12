# build
FROM node:16.16.0 AS development

WORKDIR /thomas/frontend/src/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 4200

# build
FROM node:16.16.0 AS development

WORKDIR /thomas/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@14.2.5

COPY . .

RUN npm run build

EXPOSE 4200

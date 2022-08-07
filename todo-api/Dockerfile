# Specify Node Version and Image
FROM node:16.16.0 AS development

# Specify the working dir
WORKDIR /thomas/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:16.16.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /thomas/src/app

COPY --from=development /thomas/src/app/ .

EXPOSE 3000

CMD ["node", "dist/main" ]

FROM node:18

RUN npm install -g pnpm

WORKDIR /usr/app/server

COPY package.json tsconfig.json renovate.json .env commitlint.config.js pnpm-lock.yaml ./
COPY src ./src

RUN pnpm i

CMD [ "pnpm", "start:prod" ]
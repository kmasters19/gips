FROM node:14.11

WORKDIR /app

ENV NODE_ENV development
COPY package.json yarn.lock ./
COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start:dev" ]

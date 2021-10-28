FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install

COPY ./src/ .
COPY ./tsconfig.json .

RUN npm run build

ENV AMQP_URL=amqp://host.docker.internal:5672

CMD ["node", "."]
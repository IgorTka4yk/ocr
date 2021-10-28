FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install

COPY ./src/ .
COPY ./.eslintrc.js .
COPY ./tsconfig.json .

RUN npm run build

ENV SERVER_PORT=5000
ENV SERVER_LOG_LEVEL=error
ENV AMQP_URL=amqp://host.docker.internal:5672
EXPOSE 5000

CMD ["node", "."]
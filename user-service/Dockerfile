FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

CMD ["node", "src/index.js"]
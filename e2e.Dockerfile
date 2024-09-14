FROM node:16.19.0

WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . .

CMD yarn build

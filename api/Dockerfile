FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

COPY ./.env.example /app/.env

EXPOSE 4000

CMD npm run m:run && npm run build && npm start
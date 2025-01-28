FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4000

RUN npm run build

CMD ["npm", "start"]
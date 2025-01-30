FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
COPY ./.env.example /app/.env
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

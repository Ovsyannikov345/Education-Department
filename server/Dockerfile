FROM node:latest

COPY package.json package.json
RUN npm install

COPY . .

CMD [ "npm", "run", "prod" ]
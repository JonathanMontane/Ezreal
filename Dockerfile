FROM node:7.7.4

WORKDIR /app

RUN npm install -g nodemon
ENV SERVER_PORT 6453
EXPOSE 6453
COPY . .

CMD [ "nodemon", "index.js" ]
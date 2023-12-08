FROM node:14

WORKDIR /app

COPY . .

EXPOSE 3001

WORKDIR /app/server

CMD ["node", "index.js"]


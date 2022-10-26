FROM node:16.14-alpine
 
WORKDIR /app-backend

COPY . /app-backend

RUN npm install

RUN npx tsc

CMD ["npm", "run", "dev"]

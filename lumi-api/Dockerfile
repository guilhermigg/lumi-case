FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 5000

CMD [ -d "node_modules" ] && npm run dev || npm run dev
FROM node:21-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --dev
RUN pnpm install 

COPY . .

EXPOSE 5000

CMD [ -d "node_modules" ] && pnpm run dev || pnpm run dev
FROM node:10-alpine
COPY src ./src
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run clean:build:unix
ENTRYPOINT ["npm", "run", "start:kinto"]

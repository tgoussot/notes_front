FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV REACT_APP_API_URL=https://notes.labo-narra.fr
RUN npm run build

RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000", "--no-clipboard", "-n"] 
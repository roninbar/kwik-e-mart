FROM node:16
RUN apt-get update
RUN apt-get install -y libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdrm2 libgbm1 libnss3 libxcomposite1 libxdamage1 libxkbcommon0 libxrandr2
RUN npm install -g npm@9.1.2
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps
COPY . .
ENTRYPOINT echo "My external IP is `curl -s curlmyip.org`" & npm run start-container
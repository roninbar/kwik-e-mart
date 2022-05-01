FROM node:16
RUN apt update
RUN apt install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libasound2 libgbm1
WORKDIR /var/lib/kwik-e-mart
COPY package*.json ./
RUN npm ci --only=production
COPY . .

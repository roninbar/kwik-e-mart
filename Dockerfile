FROM node:16
RUN apt update
RUN apt install -y libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdrm2 libgbm1 libnss3 libxcomposite1 libxdamage1 libxkbcommon0 libxrandr2
WORKDIR /var/lib/kwik-e-mart
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD npm run start-container
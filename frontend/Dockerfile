# Upgrade to Node 20 (Fixes the EBADENGINE warning)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install with increased timeout for slow internet
# & disable strict SSL if you are on a restricted network
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-retry-mintimeout 10000 \
    && npm install --network-timeout=100000

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
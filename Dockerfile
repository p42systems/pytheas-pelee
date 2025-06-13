FROM node:20-alpine  
WORKDIR /app
COPY ["package.json","package-lock.json*", "./"]

RUN npm install \
    --fetch-retries=10 \
    --fetch-retry-mintimeout=3000 \
    --fetch-retry-maxtimeout=30000 \
    --registry=https://registry.npmjs.org/

COPY . .

CMD ["npm", "run", "dev"]
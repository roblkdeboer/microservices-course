FROM node:lts-alpine

WORKDIR /app
# Copy package.json into the working directory
COPY package.json .
RUN npm install
# Copy everything else into the working directory
COPY . . 

CMD ["npm", "run", "dev"]

# Specify base image
FROM node:lts-alpine

ENV CI=true
# Set working directory
WORKDIR /app
# Copy over package.json
COPY package.json ./
# Install dependencies
RUN npm install
# Copy all remaining source doe
COPY ./ ./
# Set up command to run when container starts up
CMD ["npm", "start"]
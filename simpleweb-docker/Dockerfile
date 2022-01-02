# Use an existing docker image as a base
FROM node:lts-alpine
# Any commands will be executed in this directory
WORKDIR /usr/app

# Copy everything from current working directory to the working directory in the container (e.g. package.json file)
COPY ./ ./
# Download and install a dependency
RUN npm install

# Default command
CMD ["npm", "start"]

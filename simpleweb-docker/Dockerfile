# Use an existing docker image as a base
FROM node:lts-alpine
# Any commands will be executed in this directory
WORKDIR /usr/app

# Copy the package.json file from current working directory to the working directory in the container
COPY ./package.json ./
# Download and install a dependency
RUN npm install
# Copy everything else to the directory.  Prevents changes to other files invalidating the npm install step (saves time)
COPY ./ ./

# Default command
CMD ["npm", "start"]

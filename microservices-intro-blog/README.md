# Intro to Microservices

This project serves as an introduction to microservices and it's concepts.  The project is a basic blogging app where users can post and comment on posts.  The app contains 6 services:

* Client
* Comments
* Moderation
* Posts
* Query
* Event Bus

The purpose of this project is to introduce concepts such as microservices, event bus, sync vs async communication between services.

Each service has then been containerized and coordination between containers is managed by Kubernetes.  The config files can be seen in the infra folder.

# Usage

## Install dependencies

Change directory to each of six services listed above and install the dependencies.

Example commands:
```
cd client
npm install
```
## Running locally

Change directory to each of six services listed above and run the servers to run in dev mode on nodemon

Example commands:
```
cd client
npm start
```

## Running with Docker and Kubernetes

Each service has been containerised using the Dockerfile and each container is then orchestrated using Kubernetes/Skaffold.

In order to achieve this:

1. Configure the Dockerfile for each service and build the image
2. Push to docker hub
```
docker build -t roblkdeboer/client .
docker push roblkdeboer/client
```
3. Configure the deployment file for each service
4. Configure the skaffold file for deployment
5. Run ```skaffold build``` command

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
## Run

Change directory to each of six services listed above and run the servers to run in dev mode on nodemon

Example commands:
```
cd client
npm start
```

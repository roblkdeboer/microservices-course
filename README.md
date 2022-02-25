# Background
This app has been built by following Stephen Grider's [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/) course.

The app is a clone of [Stubhub](https://www.stubhub.com/), where people will visit the site to buy and sell tickets to events such as concerts and sports matches.  

The following technologies and frameworks are used:
- React.js, Next.js & Typescript - Frontend
- Node.js & Express - Backend
- Docker and Kubernetes - Containerization and Orchestration
- NATS Streaming - Event Streaming
- MongoDB - Data Storage
- Jest & Supertest - Testing
- Digital Ocean - Kubernetes Deployment and Load Balancing

This project touches on the following skillsets:
- Architecting multi-service apps
- Deployment of multi-service apps to cloud
- Limiting access to APIs using JWT authentication
- Best practices in communication between different services

# Running the app locally

Prerequisites:
- In each service, install all pre-requisites.  For example:
```
cd auth
npm install
```
- Have skaffold installed - https://skaffold.dev/
- Set up a docker account and install docker desktop - https://www.docker.com/
  - For windows, set up the wsl backend to run docker - https://docs.docker.com/desktop/windows/wsl/
  - Enable kubernetes - https://docs.docker.com/desktop/kubernetes/

To run the cluster locally:
1. Run docker desktop locally.  Ensure docker and kubernetes services are running in docker
2. In the project directory, run the skaffold command
```
skaffold dev
```

# Deployment

All deployment is managed automatically to deploy to a kubernetes cluster spun up on Digital Ocean with an accompanying load balancer.

The site is hosted at: http://www.rob-ticketing.xyz/ - to be taken down on 31/03/2022

Things required for deployment:
- A load balancer and kubernetes cluster spun up on Digital Ocean - https://www.digitalocean.com/
- A domain name - I purchased mine at https://www.namecheap.com/
- Configured ingress nginx - view infra folder for config settings

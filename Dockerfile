## From main directory of repository, in order to build the container, run:
## $ sudo docker build -t justpoker ./

## In order to run the container, run:
## $ sudo docker run -d -p <PORT>:8080 justpoker
## where PORT is a port on the host machine that will be bound to the container's internal port (currently 8080)
FROM node:13.12.0-alpine

WORKDIR /justpoker

COPY . ./

WORKDIR /justpoker/ui

# set env for react front-end
RUN echo REACT_APP_ENVIRONMENT="PROD" > .env
RUN npm install
RUN npm run build

# Change the WORKDIR to the server directory
# This is necessary because the server npm scripts assume the build process
# happens in the server, and the ts sources imports are relative to the server
# directory (when importing from ui/src/shared)
WORKDIR /justpoker/server
RUN npm install

# set env for node back-end
ENV NODE_SERVER_ENVIRONMENT="PROD"
ENV ROOT_SERVER_DIR="/justpoker"
# Build and start the server.
CMD ["npm", "start"]
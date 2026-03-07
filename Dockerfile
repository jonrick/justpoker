## From main directory of repository, in order to build the container, run:


## $ sudo docker build --build-arg build_env=PROD -t justpoker ./
## build_env=(DEV|PROD)

## In order to run the container, run:
## $ docker run -d justpoker
FROM node:20

# set build_env default
ARG build_env=PROD
ENV NODE_OPTIONS=--max-old-space-size=4096

# root
# copy shared files
WORKDIR /justpoker
COPY . ./

# ui
WORKDIR /justpoker/ui
# set env for vite front-end
RUN echo VITE_ENVIRONMENT=${build_env} > .env
RUN npm install --legacy-peer-deps
RUN npm run build


# server
WORKDIR /justpoker/server
RUN npm install --legacy-peer-deps

# set env for node back-end
ENV NODE_SERVER_ENVIRONMENT=${build_env}
ENV ROOT_SERVER_DIR="/justpoker"

EXPOSE 8080

# Build and start the server.
CMD ["npm", "start"]


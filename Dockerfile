# ------------------------------------------------------------
# Stage 1: Basic setup
# ------------------------------------------------------------
FROM node:12.20.1 as base

# Path to the working directory in the container
WORKDIR /usr/app

# Copy package.json file to workdir root path
COPY package.json ./

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Copy all content of current folder to the container's workdir
COPY . .


# ------------------------------------------------------------
# Stage 2: Generator - (re)-build website (when files change)
# ------------------------------------------------------------
FROM base as generator


# ------------------------------------------------------------
# Stage 3: Development server listening at the specified port
# ------------------------------------------------------------
FROM base as devserver

# Expose port
EXPOSE ${PORT}

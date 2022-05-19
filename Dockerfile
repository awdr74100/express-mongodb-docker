# Base image
FROM node:16-alpine

# Update packages
RUN apk upgrade --no-cache

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source
COPY . /app

# Listen port
EXPOSE 3000

# Execution command
CMD ["npm", "start"]

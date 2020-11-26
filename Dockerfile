
FROM node:14

# Create app directory and change ownership
RUN mkdir -p /usr/src/simple-node-server && chown -R node:node /usr/src/simple-node-server

# Change working directory to app directory
WORKDIR /usr/src/simple-node-server

# Copy package files into container
COPY package*.json ./

# Switch to node user
USER node

# Install Dependancies
RUN npm install

# Copy app source
COPY --chown=node:node . .

# Set port and container command
EXPOSE 4000
CMD ["npm", "start"]


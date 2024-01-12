# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application is running on
EXPOSE 4000

# Define the command to start your application
CMD ["node", "server.js"]

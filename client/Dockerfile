# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port your React app will run on (usually 3000)
EXPOSE 3000

# Command to start your React app (you may use a production server like Nginx)
CMD ["npm", "start"]

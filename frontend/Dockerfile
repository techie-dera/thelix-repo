# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json for npm install
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend files into the container
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]

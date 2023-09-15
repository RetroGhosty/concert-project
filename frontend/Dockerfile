# Use an official Node runtime as a parent image
FROM node:latest
# Set the working directory to /app
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN yarn install
# Copy the rest of the application code to the container
COPY . .
# Build the production version of the application
RUN yarn run build
# Expose port 80 to the outside world
EXPOSE 80
# Run the command to start the server
CMD ["yarn", "start"]
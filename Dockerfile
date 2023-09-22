# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 4002

# Define the command to run your application
CMD [ "node", "app.js" ]
<<<<<<< HEAD

=======
>>>>>>> 5c024b762a4da89b73b3db252b574a31c73d101b

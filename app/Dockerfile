# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

# Set the working directory to /app
WORKDIR /app

# copy package.json into the container at /app
COPY package*.json /app/
COPY yarn.lock /app/

# install dependencies
RUN yarn

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]

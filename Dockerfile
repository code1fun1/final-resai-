# Stage 1: Build the Node.js application
FROM node:18.17.0 AS build

# Set working directory
WORKDIR /app

#### Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

#### Install dependencies
RUN npm install -f

# Copy the rest of the application source code
COPY . .
RUN node -v
# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Vite application to the Nginx server (Vite outputs to dist/, not build/)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration file if you have a custom one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world...
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

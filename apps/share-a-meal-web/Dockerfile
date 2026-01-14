# Multi-stage build for Angular frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Copy necessary library and app source code
COPY libs/ ./libs/
COPY apps/share-a-meal-web/ ./apps/share-a-meal-web/

# Install dependencies
RUN npm ci --only=production

# Build the application
RUN npx nx build share-a-meal-web --configuration=production

# Production stage
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist/apps/share-a-meal-web /usr/share/nginx/html

# Copy nginx configuration
COPY apps/share-a-meal-web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
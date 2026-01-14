# Multi-stage build for NestJS backend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Copy necessary library and app source code
COPY libs/ ./libs/
COPY apps/data-api/ ./apps/data-api/

# Install dependencies
RUN npm ci --only=production

# Build the application
RUN npx nx build data-api --configuration=production

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application and package.json from build stage
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/data-api ./
COPY --from=build --chown=nextjs:nodejs /app/dist/apps/data-api/package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "main.js"]
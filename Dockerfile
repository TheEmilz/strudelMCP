# Use Node.js LTS version
FROM node:18-slim

# Install Playwright dependencies
RUN apt-get update && apt-get install -y \
    # Chromium dependencies
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libatspi2.0-0 \
    libxshmfence1 \
    # Additional utilities
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy node_modules from local (faster and more reliable for this use case)
COPY node_modules ./node_modules

# Install Playwright Chromium with system dependencies
RUN npx playwright install chromium --with-deps 2>&1 || echo "Playwright install had warnings but continuing..."

# Copy pre-built dist folder (build outside Docker)
COPY dist ./dist

# Create patterns directory
RUN mkdir -p /app/patterns

# Set environment variables
ENV NODE_ENV=production
ENV STRUDEL_HEADLESS=true
ENV STRUDEL_PORT=3000
ENV STRUDEL_TRANSPORT=http

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]

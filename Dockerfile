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

# Install dependencies
RUN npm ci --only=production

# Install Playwright Chromium
RUN npx playwright install chromium --with-deps

# Copy source files
COPY tsconfig.json ./
COPY src ./src

# Build the TypeScript code
RUN npm run build

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

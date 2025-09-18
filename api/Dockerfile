# Use the official Playwright image with all browsers and dependencies
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Install additional dependencies for better browser support and GCP compatibility
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm1 \
    libxrandr2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgdk-pixbuf2.0-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    ca-certificates \
    curl \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production --no-audit --no-fund

# Install Playwright browsers (Chromium for scraping)
RUN npx playwright install chromium --with-deps

# Copy the rest of the application code
COPY . .

# Environment variables for GCP compatibility
ENV NODE_ENV=production
ENV PORT=5000
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV DISPLAY=:99
ENV DEBIAN_FRONTEND=noninteractive

# GCP Cloud Run compatibility
ENV HOST=0.0.0.0

# Create required directories with proper permissions
RUN mkdir -p /app/uploads /app/downloads /app/generated /app/responseDocs /tmp && \
    chmod 755 /app/uploads /app/downloads /app/generated /app/responseDocs /tmp

# Create a non-root user for security (GCP best practice)
RUN groupadd -r appuser && useradd -r -g appuser -G audio,video appuser && \
    chown -R appuser:appuser /app && \
    chown -R appuser:appuser /tmp

# Switch to non-root user
USER appuser

# Expose port 5000 as per your application
EXPOSE 5000

# Set proper signal handling for graceful shutdown
STOPSIGNAL SIGTERM

# Start the application with proper signal handling
CMD ["node", "index.js"]
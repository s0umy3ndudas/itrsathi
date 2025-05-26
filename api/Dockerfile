FROM node:18

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    wget \
    libnss3 \
    libatk-bridge2.0-0 \
    libxss1 \
    libasound2 \
    libx11-xcb1 \
    libgtk-3-0 \
    libgbm1 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install Chrome using Puppeteer inside container
RUN npx puppeteer browsers install chrome

# Set Puppeteer Chrome path inside the container
ENV PUPPETEER_EXECUTABLE_PATH=/root/.cache/puppeteer/chrome/linux-136.0.7103.94/chrome-linux64/chrome

# Copy app code
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

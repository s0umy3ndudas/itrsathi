FROM node:18

# Install Puppeteer dependencies (cleaned up)
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



# Working directory
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

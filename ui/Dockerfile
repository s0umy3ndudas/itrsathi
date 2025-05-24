# Use Node.js for development
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]

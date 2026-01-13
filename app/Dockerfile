# Menggunakan base image node versi 18 alpine
FROM node:18-alpine

# Tentukan working directory
WORKDIR /usr/src/app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy semua file aplikasi
COPY . .

# Expose port internal aplikasi (3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start
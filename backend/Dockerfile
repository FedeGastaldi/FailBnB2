# Imagen base oficial de Node.js
FROM node:20

# Crear el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Instala cliente de MySQL
RUN apt-get update && apt-get install -y default-mysql-client

# Copiar el resto del código
COPY . .

# Exponer el puerto de la API (ajustar si usás otro)
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]

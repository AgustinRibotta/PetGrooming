# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la app para producción
RUN npm run build

# Etapa 2: Servir la app estática con un servidor ligero
FROM nginx:alpine

# Copiamos la build desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos configuración personalizada de nginx si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

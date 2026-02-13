FROM node:14-alpine as builder-step

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build --prod

FROM nginx:1.17.1-alpine

# Copiamos la build de Angular
COPY --from=builder-step /app/dist/app /usr/share/nginx/html

# Reemplazamos la configuración por defecto de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 8447
EXPOSE 8447

FROM node:18.20.4 AS builder

# ENV  NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app
COPY package.json ./
# COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html

# # Build Stage
# FROM node:16.19.0 as build-stage

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --force

# COPY . .

# RUN npm run build

# FROM nginx:latest

# # Copy the NGINX configuration file
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the build artifacts from the build stage to NGINX web server
# COPY --from=build-stage /app/build/ /usr/share/nginx/html

# WORKDIR /app
# RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
#   chown -R nginx:nginx /var/cache/nginx && \
#   chown -R nginx:nginx /var/log/nginx && \
#   chown -R nginx:nginx /etc/nginx/conf.d
# RUN touch /var/run/nginx.pid && \
#   chown -R nginx:nginx /var/run/nginx.pid

# USER nginx

# # Expose port 80 for the NGINX server
# EXPOSE 80

# # Command to start NGINX when the container is run
# CMD ["nginx", "-g", "daemon off;"]

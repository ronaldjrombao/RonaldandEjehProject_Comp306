#Build Stage
FROM node:21-alpine3.18 AS build
WORKDIR /app
COPY ./package*.json ./
COPY ./default.conf ./
RUN npm install
COPY ./ .
RUN npm run build

#Deployment Stage
FROM nginx:alpine
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

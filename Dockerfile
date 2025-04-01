#Build Stage
FROM node:21-alpine3.18 as build
WORKDIR /app
COPY ./package*.json ./
COPY ./nginx.conf ./
RUN npm install
COPY ./ .
RUN npm run build

#Deployment Stage
FROM nginx:alpine
COPY --from=build /app/dist/ims_client/browser /usr/share/nginx/html/comp367
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

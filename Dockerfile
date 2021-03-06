FROM node:14 as builder
WORKDIR /app
COPY package.json .
RUN npm install --global --force yarn
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:1.16.0-alpine
WORKDIR /
COPY ./nginx.conf /etc/nginx/conf.d
RUN cp /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


FROM node:14 as builder
WORKDIR /app
COPY package.json .
RUN npm install --global --force yarn
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


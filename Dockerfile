FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/landing .

WORKDIR /usr/share/nginx/html

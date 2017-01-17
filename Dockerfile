FROM hub.c.163.com/bingohuang/debian:163

MAINTAINER bingohuang <me@bingohuang.com>

RUN apt-get update && apt-get install -y nginx

COPY . /usr/share/nginx/www

WORKDIR /usr/share/nginx/www

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
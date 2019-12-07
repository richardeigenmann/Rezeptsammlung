# docker exec -it recipes bash

FROM nginx:latest
RUN apt-get clean && apt-get update && apt-get install -y \
  spawn-fcgi \
  fcgiwrap \
  libdbi-perl \
  libcgi-pm-perl \
  libdate-calc-perl \
  libmp3-tag-perl \
  liblog-log4perl-perl \
  libhtml-fromtext-perl \
  libdbd-mysql-perl \
  php \
  less vim \
  && sed -i 's/www-data/nginx/g' /etc/init.d/fcgiwrap \
  && chown nginx:nginx /etc/init.d/fcgiwrap

COPY vhost.conf /etc/nginx/conf.d/default.conf
COPY ["*.htm", "*css", "*jpg", "*json", "*gif", "/var/www/"]
RUN chmod a+rx /var/www/*
CMD nginx -g 'daemon off;'

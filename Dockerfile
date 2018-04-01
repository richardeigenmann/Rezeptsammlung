# docker build -t richardeigenmann/richinet .
# docker run -it --rm --hostname richinet -v /richi/Src/RichiNet/weblog:/var/log/nginx/web -p8081:80 richardeigenmann/richinet

FROM nginx:1.13
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

#VOLUME ["/var/www"]

COPY *.htm *css *jpg *json /var/www/

#RUN sed -e s/@senddata@/1/g  \
#  -e s/@DBuser@/richi/g \
#  -e s/@DBpass@/pw/g \
#  -e s/@DBdb@/richi/g \
#	-e s/@DBserver@/database/g \
#  -e 's/@dirprefix@/\/richi/g' \
#  -e 's/@fileHosts@//g' \
#	-e 's/@httpPrefix@/http:\/\/localhost:8080/g' \
#  -e s/@fastmode@/1/g \
#  -e s/@DEBUG_LEVEL@/DEBUG/ \
#  -e s/@translatespaces@/0/ \
#  -e s/@ListSize@/200/ \
#  -e 's/@UndefinedString@/\(undefined\)/' \
#  /var/www/music.pl > /var/www/music.pl.tmp \
#  && mv /var/www/music.pl.tmp /var/www/music.pl \
#  && chmod a+x /var/www/music.pl

RUN chmod a+rx /var/www/*

#CMD /etc/init.d/fcgiwrap start \
#    && nginx -g 'daemon off;'

CMD nginx -g 'daemon off;'

#RUN ls -l /var/www
#ENTRYPOINT ["bash"]

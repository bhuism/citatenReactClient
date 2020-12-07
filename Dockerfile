FROM nginx:stable

EXPOSE 8080

COPY ./build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

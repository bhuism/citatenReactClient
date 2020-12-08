FROM nginx:stable

ARG COMMIT_SHA

EXPOSE 8080

COPY ./build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN sed -i s/%COMMIT_SHA%/${COMMIT_SHA}/g /var/www/actuator/info

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

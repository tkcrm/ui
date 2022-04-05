FROM nginx:alpine

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN rm /etc/nginx/conf.d/default.conf
COPY /_deploy/nginx/nginx.conf /etc/nginx/conf.d
COPY ./dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

FROM nginx:1.23
COPY nginx-config /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
EXPOSE 8000
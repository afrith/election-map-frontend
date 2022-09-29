FROM nginx:1.20.2
COPY nginx-config /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
EXPOSE 8000
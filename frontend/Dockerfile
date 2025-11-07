FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

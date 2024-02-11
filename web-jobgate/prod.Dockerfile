# Step 1: ng build --prod
# Step 2: docker build -t registry.gitlab.com/ezgopos-mnt/ez-software-client:latest . -f prod.Dockerfile

# npx ng build --configuration=demo && docker build -t registry.gitlab.com/ezgopos-mnt/ez-software-client:demo . -f prod.Dockerfile && docker push registry.gitlab.com/ezgopos-mnt/ez-software-client:demo

# Dung de build image nhanh o local
FROM --platform=amd64 nginx:alpine as FINAL

COPY nginx-local.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /var/www/soft/*

# Copy from the stage 1
COPY ./dist/soft /var/www/soft

EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]

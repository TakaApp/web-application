# Taka Web application

> Taka's Web app

## Preview

![preview](./screenshots/v0.4.png 'Preview')

## Deploy

```
docker pull gcr.io/k8s-aksels/github-takaapp-web-application:v1.9
emacs -nw docker-compose.yml
docker stop web-application
docker-compose up -d taka-web
```

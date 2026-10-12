# syntax=docker/dockerfile:1.10
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json ./
COPY scripts ./scripts
COPY tests ./tests
COPY public ./public
RUN node --test tests/*.test.js
ARG SITE_BASE_PATH=/
ENV SITE_BASE_PATH=$SITE_BASE_PATH
RUN --mount=type=secret,id=whatsapp_phone,env=WHATSAPP_PHONE,required=true node scripts/build.mjs

# Pages recibe archivos, no ejecuta un servidor ni un contenedor.
FROM scratch AS site
COPY --from=build /app/dist/ /

FROM nginxinc/nginx-unprivileged:1.28-alpine AS runtime
COPY container/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist/ /usr/share/nginx/html/
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

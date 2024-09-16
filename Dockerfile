FROM node:18-alpine AS my-app-build
WORKDIR /app
COPY . .
RUN pwd
ARG env_name
ENV ENVIRONMENT=${env_name}
#RUN export NODE_OPTIONS=--openssl-legacy-provider && yarn build && yarn install --prod --ignore-scripts --prefer-offline
RUN npm install --force && npm run build -- --configuration=${ENVIRONMENT}


FROM nginx:stable-alpine
COPY --from=my-app-build /app/dist/template/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
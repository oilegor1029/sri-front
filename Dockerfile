FROM node:12-alpine3.12 as sri-front

WORKDIR /app

COPY . ./

RUN mkdir -p /bundle

VOLUME /bundle

RUN chmod +x bundle-pj.sh; chmod +x copy-bundle.sh

RUN npm i; npm run adapt-queries common; npm run relay-common; npm run build;\
    rm -rf /app/node_modules

ENTRYPOINT ["/app/copy-bundle.sh"]

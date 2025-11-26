FROM node:18-alpine as dependencies

RUN apk update && apk add --no-cache zip git curl

RUN corepack enable
RUN corepack use pnpm@latest

COPY entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

FROM dependencies as node

CMD ["sh"]

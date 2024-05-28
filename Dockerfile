FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
COPY .husky /temp/prod/.husky
ENV NODE_ENV=production
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS release
LABEL "org.opencontainers.image.source"="https://github.com/i9or/basictodo"
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]

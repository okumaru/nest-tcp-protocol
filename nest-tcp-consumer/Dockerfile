FROM node:iron-alpine3.20 As base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /usr/src/app
WORKDIR /usr/src/app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
# RUN pnpm i
# RUN pnpm add @nestjs/cli
# RUN npx prisma generate
RUN pnpm build

FROM base
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/dist /usr/src/app/dist

EXPOSE 3001
CMD [ "node", "/usr/src/app/dist/main.js" ]
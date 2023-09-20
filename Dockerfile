FROM oven/bun as dev

WORKDIR /app

COPY src/ /app/src
COPY static/ /app/static
COPY package.json /app/package.json
COPY postcss.config.cjs /app/postcss.config.cjs
COPY svelte.config.js /app/svelte.config.js
COPY tailwind.config.cjs /app/tailwind.config.cjs
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.ts /app/vite.config.ts

RUN bun install


ENTRYPOINT [ "bun", "run", "dev"]

FROM oven/bun as build

WORKDIR /app

# copy node modules from dev stage
COPY --from=dev /app/ /app/

RUN bun run build

FROM oven/bun as prod

WORKDIR /app

COPY --from=build /app/ /app/

WORKDIR /app/build

ENTRYPOINT [ "node", "index.js" ]

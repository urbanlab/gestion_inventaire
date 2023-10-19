FROM node:lts as dependencies

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

FROM node:lts as dev

WORKDIR /app

COPY --from=dependencies /app/node_modules/ /app/node_modules

COPY src/ /app/src
COPY static/ /app/static

COPY package.json /app/package.json
COPY postcss.config.cjs /app/postcss.config.cjs
COPY svelte.config.js /app/svelte.config.js
COPY tailwind.config.ts /app/tailwind.config.ts
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.ts /app/vite.config.ts


ENTRYPOINT [ "npm", "run", "dev"]

FROM node:lts as build 

WORKDIR /app

# copy node modules from dev stage
COPY --from=dev /app/ /app/

RUN npm run build

FROM node:lts as prod

WORKDIR /app

COPY --from=build /app/ /app/

WORKDIR /app/build

ENTRYPOINT [ "node", "index.js" ]

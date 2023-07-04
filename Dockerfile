FROM node:lts-slim as dev

WORKDIR /app

COPY src/ /app/src
COPY static/ /app/static
#COPY .eslintignore /app/.eslintignore
#COPY .eslintrc.cjs /app/.eslintrc.cjs
COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY postcss.config.cjs /app/postcss.config.cjs
COPY svelte.config.js /app/svelte.config.js
COPY tailwind.config.cjs /app/tailwind.config.cjs
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.ts /app/vite.config.ts

RUN npm install

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev"]

FROM node:lts-slim as build

WORKDIR /app

# copy node modules from dev stage
COPY --from=dev /app/ /app/

RUN npm run build

FROM node:alpine as prod

WORKDIR /app

COPY --from=build /app/ /app/

WORKDIR /app/build

ENTRYPOINT [ "node", "index.js" ]

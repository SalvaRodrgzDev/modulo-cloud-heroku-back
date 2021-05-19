FROM node:12-apine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Build backend
FROM base AS build-backend
COPY ./ ./
RUN npm install
RUN npm run build

# Release
FROM base AS release
COPY --from=build-backend /usr/app/dist ./
COPY ./package.json ./
RUN npm install --only=production

ENTRYPOINT [ "node", "index" ]

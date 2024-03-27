FROM node:21.7-bookworm AS build

WORKDIR /app
# Create app directory
ADD ./ /app
RUN npm install --force
RUN npm run build


FROM node:21.7-bookworm AS production
WORKDIR /app
COPY ./package-lock.json /app
COPY ./package.json /app
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
CMD ["node", "build/index.js"]
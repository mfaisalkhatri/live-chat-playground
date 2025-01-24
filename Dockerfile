FROM node:23-alpine AS build
WORKDIR /live-chat-playground
COPY jsconfig.json next.config.mjs package.json postcss.config.mjs server.js tailwind.config.js  ./
COPY /app ./app
RUN npm install

FROM node:23-alpine
WORKDIR /live-chat-playground
COPY --from=build /live-chat-playground/ /live-chat-playground/
EXPOSE 3000 3001
CMD ["npm", "run", "dev"]
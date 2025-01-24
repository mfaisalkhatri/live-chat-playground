FROM node:lts

RUN mkdir /live-chat-playground

WORKDIR /live-chat-playground

COPY ./ ./

RUN npm install

CMD npm run dev
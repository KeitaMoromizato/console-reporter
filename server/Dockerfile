FROM node:8.1
LABEL maintainer "Keita Moromizato <keita.moromi@gmail.com>"

ENV APP_ROOT /node
WORKDIR $APP_ROOT

COPY package.json package.json
COPY index.js index.js

EXPOSE 3333
CMD ["npm", "start"]

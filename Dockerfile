FROM node:6.0.0-wheezy

ADD . /src

COPY ./package.json /src/package.json

RUN cd /src; npm install

COPY . /src

CMD ["node", "/src/app.js"]

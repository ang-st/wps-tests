FROM node:15


WORKDIR /usr/src/app
COPY package-*.json ./
#COPY yarn.lock ./
RUN npm install
COPY . . 
ENTRYPOINT [ "./node_modules/mocha/bin/mocha.js" ]

FROM node:9.5

WORKDIR /src

COPY . /src

EXPOSE 80

CMD ["npm", "start"]
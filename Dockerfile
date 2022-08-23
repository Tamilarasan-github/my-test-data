FROM node:latest
WORKDIR '/app'
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
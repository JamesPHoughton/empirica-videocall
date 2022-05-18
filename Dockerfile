FROM node:16-bullseye

WORKDIR /app

COPY package.json .
COPY rollup.config.js .

RUN npm install

COPY .storybook ./storybook
COPY src ./src
COPY build ./build

CMD ["npm", "run", "storybook"]
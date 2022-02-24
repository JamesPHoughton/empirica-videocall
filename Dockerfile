FROM node:16-bullseye

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY rollup.config.js .

RUN yarn install

COPY .storybook ./storybook
COPY src ./src
COPY build ./build

CMD ["yarn", "storybook"]
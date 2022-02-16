FROM node:16-bullseye

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install

COPY .storybook ./storybook
COPY src ./src

CMD ["yarn", "storybook"]
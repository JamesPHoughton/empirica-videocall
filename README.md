# Empirica Video Call

[![npm version](https://badge.fury.io/js/empirica-videocall.svg)](https://badge.fury.io/js/empirica-videocall) [![storybook badge](https://raw.githubusercontent.com/storybookjs/brand/main/badge/badge-storybook.svg)](https://main--6217e07e3cc586003a3fb15e.chromatic.com)

This package contains a React component for a video call in Empirica. 
It is designed to mirror the [Empirica Chat](https://github.com/empiricaly/chat) 
API to the extent possible

This module uses the [Jitsi](https://jitsi.org/) open source video-conferencing platform.


Add to your Empirica project with:

```sh

meteor npm install --save empirica-videocall

```

## Usage

```jsx
import { Call } from "empirica-videocall";

//...

<Call player={player} roomName={"roomname goes here"} />;
```

`Call` expects 2 required props:

- `player`: the current player
- `roomName`: an identifier that will create a unique room. The round id is a good choice.

`Call` also displays a name for each participant, which you need to set
in the experiment independently of the `playerId`: `player.set('name', "myPseudonym")`


# Development

This is best developed using a docker container. With the docker daemon running, type `docker-compose up`.

To build the package, run `yarn run build` within the container.

On github commit, will build storybook and publish to chromatic.
import React from 'react';

import Call from './Call';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Call',
  component: Call,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Call {...args} />;

const Player = {
  data: {"name": "Ponder Stibbons"},
  get (key) {
    return this.data[key];
  }
}


//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
   primary: true,
   label: 'Call',
   roomName: "my_test_room_1",
   player: Player
};
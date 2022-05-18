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

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
   roomName: "my_test_room_1",
   displayName: "Ponder Stibbons"
};
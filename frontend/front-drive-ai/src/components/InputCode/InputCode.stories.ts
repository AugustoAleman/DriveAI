import type { Meta, StoryObj } from "@storybook/react";

import InputCode from "components/InputCode/InputCode";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof InputCode> = {
  title: "Components/InputCode",
  component: InputCode,
  tags: ['autodocs'],
  argTypes: {
    email: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof InputCode>;

export const Default: Story = {
  args: {
    email: "abrahamchalita@gmail.com",
  },
};

/**  
 * uaisdgiasdgasiu
*/

import type { Meta, StoryObj } from "@storybook/react";

import ExampleMui from "components/ExampleMui/ExampleMui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ExampleMui> = {
  title: "Example/ExampleMui",
  component: ExampleMui,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "text" },
    bgColor: { control: "text" },
    hoverColor: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ExampleMui>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
/**
 * Main Button with using the theme
 */
export const MainButton: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    bgColor: "primary.main",
    color: "secondary.main",
    hoverColor: "primary.light",
    children: 'botón'
  },
};

/**
 * Main Button with other bgColor
 */
export const SecondButton: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    ...MainButton.args,
    bgColor: "error.main",
  },
};

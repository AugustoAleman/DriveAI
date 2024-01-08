import type { Meta, StoryObj } from "@storybook/react";

import ExampleCustom from "components/ExampleCustom/ExampleCustom";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ExampleCustom> = {
  title: "Example/ExampleCustom",
  component: ExampleCustom,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: "color" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ExampleCustom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    label: "Fiction",
  },
};

export const CustomColor: Story = {
  args: {
    color: "#638729",
    label: "Fantasy",
  },
};

export const Large: Story = {
  args: {
    label: "Fantasy",
    size: "Large",
  },
};

export const Medium: Story = {
  args: {
    label: "Fantasy",
    size: "Medium",
  },
};

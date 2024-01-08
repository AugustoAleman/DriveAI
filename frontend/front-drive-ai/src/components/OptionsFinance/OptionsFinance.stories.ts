import type { Meta, StoryObj } from "@storybook/react";
import OptionsFinance from "components/OptionsFinance/OptionsFinance";

//Creation of the meta data for the component Card
const meta: Meta<typeof OptionsFinance> = {
  title: "Components/OptionsFinance",
  component: OptionsFinance,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "text" },
    recommended: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof OptionsFinance>;

//Creation of the stories for the component Card

//Default story
export const Default: Story = {
  args: {
    type: "unique",
	recommended: false,
	selected: false,
  },
};

export const UniqueFirstVariant: Story = {
  args: {
    type: "unique",
	recommended: true,
	selected: false,
  },
};

export const UniqueSecondVariant: Story = {
  args: {
    type: "unique",
	recommended: false,
	selected: true,
  },
};

export const UniqueThirdVariant: Story = {
  args: {
    type: "unique",
	recommended: true,
	selected: true,
  },
};

//Story with custom Color
export const MonthlyFirstVariant: Story = {
  args: {
    type: "monthly",
	recommended: false,
	selected: false,
  },
};

export const MonthlySecondVariant: Story = {
  args: {
    type: "monthly",
	recommended: true,
	selected: false,
  },
};

export const MonthlyThirdVariant: Story = {
  args: {
    type: "monthly",
	recommended: false,
	selected: true,
  },
};

export const MonthlyFourthVariant: Story = {
  args: {
    type: "monthly",
	recommended: true,
	selected: true,
  },
};

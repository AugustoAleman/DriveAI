import type { Meta, StoryObj } from "@storybook/react";

import Card from "components/Card/Card";

import theme from "theme/theme";

//Creation of the meta data for the component Card
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    color: { control: "color" },
    height: { control: "text" },
    width: { control: "text" },
    border: { control: "text" },
    borderRadius: { control: "text" },
    shadow: { control: "text" },
    padding: { control: "text" },
    margin: { control: "text" },
    hoverColor: { control: "color" },
    hasHoverColor: { control: "boolean" },
    cursor: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

//Creation of the stories for the component Card

//Default story
export const Default: Story = {
  args: {
    height: "150px",
    width: "150px",
    color: theme.palette.background.default,
    border: "none",
    borderRadius: "Medium",
    shadow: " 2px 2px 7px rgba(0, 0, 0, 0.3)",
    padding: "0px",
    margin: "0px",
    hasHoverColor: false,
    hoverColor: theme.palette.tertiary.main,
    cursor: "default",
  },
};

//Story with custom Color
export const CustomColor: Story = {
  args: {
    color: "#638729",
    height: "150px",
    width: "150px",
    border: "none",
    borderRadius: "Medium",
    shadow: "none",
    padding: "0px",
    margin: "0px",
    hasHoverColor: true,
    hoverColor: theme.palette.secondary.main,
    cursor: "default",
  },
};

//Story with custom Border
export const CustomBorder: Story = {
  args: {
    color: theme.palette.background.default,
    height: "150px",
    width: "150px",
    border: "10px solid black",
    borderRadius: "Medium",
    shadow: "none",
    padding: "0px",
    margin: "0px",
    hasHoverColor: false,
    hoverColor: theme.palette.tertiary.main,
    cursor: "default",
  },
};

//Story with custom Border Radius
export const CustomBorderRadius: Story = {
  args: {
    color: theme.palette.tertiary.main,
    height: "150px",
    width: "150px",
    border: "none",
    borderRadius: "Small",
    shadow: "none",
    padding: "0px",
    margin: "0px",
    hasHoverColor: false,
    hoverColor: theme.palette.primary.main,
    cursor: "default",
  },
};

//Story with custom Shadow
export const CustomShadow: Story = {
  args: {
    color: theme.palette.background.default,
    height: "150px",
    width: "150px",
    border: "none",
    borderRadius: "Medium",
    shadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    padding: "0px",
    margin: "0px",
    hasHoverColor: false,
    hoverColor: theme.palette.tertiary.main,
    cursor: "default",
  },
};

//Story with custom Hover Color
export const hoverColor: Story = {
  args: {
    color: theme.palette.tertiary.main,
    height: "100px",
    width: "100px",
    border: "none",
    borderRadius: "Medium",
    shadow: "2px 2px 7px rgba(0, 0, 0, 0.3)",
    padding: "0px",
    margin: "0px",
    hasHoverColor: true,
    hoverColor: theme.palette.primary.main,
    cursor: "default",
  },
};

//Story with custom Cursor
export const CustomCursor: Story = {
  args: {
    color: theme.palette.tertiary.main,
    height: "100px",
    width: "100px",
    border: "none",
    borderRadius: "Medium",
    shadow: "none",
    padding: "0px",
    margin: "0px",
    hasHoverColor: false,
    hoverColor: theme.palette.primary.main,
    cursor: "progress",
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import NavbarVertical from "./NavbarVertical";

import theme from "theme/theme";

//Creation of the meta data for the component Card
const meta: Meta<typeof NavbarVertical> = {
    title: "Components/NavbarVertical",
    component: NavbarVertical,
    tags: ["autodocs"],
    argTypes: {
      color: { control: "color" },
      width: { control: "text" },
      marginIconButt: { control: "text" },
      iconSize: { control: "text" },
    },
  };

  export default meta;
  type Story = StoryObj<typeof NavbarVertical>;

export const Default: Story = {
    args: {
      color: theme.palette.primary.main,
      width: "70px",
      rol: "SALESMAN"
    },
};
export const superAdmin: Story = {
  args: {
    color: theme.palette.primary.main,
    width: "70px",
    rol: "SUPERADMIN",
  },
};
export const gerente: Story = {
  args: {
    color: theme.palette.primary.main,
    width: "70px",
    rol: "MANAGER",
  },
};

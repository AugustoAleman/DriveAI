import type { Meta, StoryObj } from "@storybook/react";
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from "components/Button/Button";

import theme from "theme/theme";

//Creation of the meta data for the component Button
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    hoverColor: { control: "color" },
    width: { control: "text" },
    height: { control: "text" },
    fontSize: { control: "text" },
    fontWeight: { control: "text" },
    borderRadius: { control: "text" },
    disabled: { control: "boolean" },
    href: { control: "text" },
    shadow: { control: "boolean" },
    hoverShadow: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

//Creation of the stories for the component Button

//Default story
export const Buscar: Story = {
  args: {
    children: "Buscar",
    width: "12vw",
  },
};

//Example of a "save" button
export const Guardar: Story = {
  args: {
    children: "Guardar",
    color: "#000",
    backgroundColor: theme.palette.background.default,
    width: "10vw",
    fontSize: "0.6rem",
  },
};

export const Filtrar: Story = {
  args: {
    children: "Filtrar",
    variant: "outlined",
    color: theme.palette.secondary.main,
    fontSize: "0.7rem",
    endIcon: <FilterListIcon />,
  },
};

export const Editar: Story = {
  args: {
    children: "Editar",
    variant: "text",
    color: theme.palette.secondary.main,
    fontSize: "0.6rem",
    fontWeight: "bold",
  },
};  
import type { Meta, StoryObj } from "@storybook/react";
import Footer from "components/Footer/Footer";
import theme from "../../theme/theme";
import Card from "../Card/Card";

const meta: Meta<typeof Footer> = {

    title: "Components/Footer",
    component: Footer,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        colorBackground: {control: "color"},
        colorText: {control: "color"},
        colorLineAndSocialMedia:  {control: "color"}
    },
  };


export default meta;
type Story = StoryObj<typeof Footer>;

//Default story
export const Default: Story = {
    args: {
        colorBackground: theme.palette.primary.main,
        colorText: theme.palette.background.default,
        colorLineAndSocialMedia: theme.palette.accent.main
    },
};

export const CustomColor: Story = {
  args: {
    colorBackground: theme.palette.primary.main,
    colorText: theme.palette.background.default,
    colorLineAndSocialMedia: theme.palette.accent.main
  },
};

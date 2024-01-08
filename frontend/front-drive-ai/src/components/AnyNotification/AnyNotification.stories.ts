import type { Meta, StoryObj } from "@storybook/react";
import Footer from "components/AnyNotification/AnyNotification";
import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from "../../theme/theme";
import AnyNotification from "components/AnyNotification/AnyNotification";

const meta: Meta<typeof AnyNotification> = {
    title: "Components/AnyNotification",
    component: Footer,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: {control: "text"},
        text: {control: "text"},
        buttonTitle: {control: "text"},
        colorIcon: {control: "color"},
        icon: {control: "text"},
    },
  };

export default meta;
type Story = StoryObj<typeof AnyNotification>;

export const CustomNotification: Story = {
    args: {
        title: "Success",
        text: "You have successfully completed the task",
        buttonTitle: "Close",
        colorIcon: theme.status.correct,
    },
  };

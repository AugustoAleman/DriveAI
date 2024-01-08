import type { Meta, StoryObj } from '@storybook/react';
import { InputCheckbox } from "./index";

const meta: Meta<typeof InputCheckbox> = {
    title: "Components/Input/InputCheckbox",
    component: InputCheckbox,
    tags: [ "autodocs" ]
};

export default meta;
type Story = StoryObj<typeof InputCheckbox>;

export const CustomInputFieldCustomSelect: Story = {
    args: {
        label:"Select an option",
    }
};
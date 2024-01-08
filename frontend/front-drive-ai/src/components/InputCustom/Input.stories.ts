import type { Meta, StoryObj } from '@storybook/react';
import {InputField} from 'components/InputCustom';

const meta: Meta<typeof InputField> = {
    title: "Components/Input/InputField",
    component: InputField,
    tags: ["autodocs"],
    argTypes: {
      InputType: { control: "TypeInput"}
    },
  };

export default meta;
type Story = StoryObj<typeof InputField>;

export const CustomInputFieldSurname: Story = {
  args: {
    InputType: "Surname",
  },
};

export const CustomInputFieldName: Story = {
  args: {
    InputType: "Name",
  },
};

export const CustomInputFieldPassword: Story = {
  args: {
    InputType: "PasswordRepeat",
  },
};


export const CustomInputFieldDataSheet: Story = {
  args: {
    InputType: "DataSheet",
  },
};





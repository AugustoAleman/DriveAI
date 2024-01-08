import type { Meta, StoryObj } from '@storybook/react';
import {InputCredential} from 'components/InputCustom';

const meta: Meta<typeof InputCredential> = {
    title: "Components/Input/InputCredential",
    component: InputCredential,
    tags: ["autodocs"],
    argTypes: {
      
    },
  };

export default meta;
type Story = StoryObj<typeof InputCredential>;

export const CustomInputFieldSurname: Story = {
  args: {
    
  },
};


import type { Meta, StoryObj } from '@storybook/react';
import { CustomSelect } from "components/InputCustom";


const meta: Meta<typeof CustomSelect> = {
    title: "Components/Input/CustomSelect",
    component: CustomSelect,
    tags: ["autodocs"],
    argTypes: {
      options: {},
      label : { control: "labelType" },
      defaultValue : {control: "Option"},
      onChange : {value: {control: "valueString"} },
            

    },
  };

export default meta;
type Story = StoryObj<typeof CustomSelect>;

export const CustomInputFieldCustomSelect: Story = {
  args: {
    
    options:[
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    label:"Select an option",
    defaultValue: "option1", 
    onChange: (value) => console.log(value)


  }
};



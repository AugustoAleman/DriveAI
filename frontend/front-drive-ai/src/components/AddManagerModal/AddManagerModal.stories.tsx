import type { Meta, StoryObj } from '@storybook/react';
import { AddManagerModal } from 'components/AddManagerModal';
import { action } from '@storybook/addon-actions';
import { useState } from "react";
import {InputStateProps} from "./types";

/**
 * Modal to add manager to agency
 */

const meta: Meta<typeof AddManagerModal> = {
  title: 'Components/AddManagerModal',
  component: AddManagerModal,
  tags: ["autodocs"],
  argTypes: {
    open: { defaultValue: false, control: "none" },
    handleClose: { action: "clicked" },
    handleOnSave: { action: "clicked" },
  }
};
export default meta;
type Story = StoryObj<typeof AddManagerModal>;

export const AddManagerModalOpen: Story = {
  args: {
    open: false,
    handleClose: action('clicked'),
  },
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleSave = (inputs: InputStateProps) => new Promise(() => console.log("PROMISE"));

    return (
      <div>
        <button onClick={() => setOpen(true)}>OPEN</button>
        <AddManagerModal open={open || args.open} handleClose={handleClose} handleOnSave={handleSave} />
      </div>
    )
  }
};

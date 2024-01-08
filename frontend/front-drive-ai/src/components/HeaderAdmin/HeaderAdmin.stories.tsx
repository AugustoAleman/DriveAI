import type { Meta, StoryObj } from "@storybook/react";
import HeaderAdmin from "components/HeaderAdmin/HeaderAdmin";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderAdmin> = {
    
  title: "Components/Header admin",
  component: HeaderAdmin,
  tags: ["autodocs"],
  
};

export default meta;
type Story = StoryObj<typeof HeaderAdmin>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
/**
 * Main Button with using the theme
 */
export const AdminNavBar: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    userNamee: "UserName",
    bottomName_1: "General",
    bottomName_2: "Seguridad",
  },
};

;

import type { Meta, StoryObj } from "@storybook/react";
import HeaderAdminCards from "./HeaderAdminCards";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderAdminCards> = {
  title: "Components/HeaderAdminCards",
  component: HeaderAdminCards,
  tags: ["autodocs"],
  argTypes: {
	tabs: { control: { type: 'array', }, },
	activeTab: { control: { type: 'text' },},
	title: { control: { type: 'text' },},
	about: { control: { type: 'text' },},
	new_requests: { control: { type: 'number' },},
	old_requests: { control: { type: 'number' },},
	description: { control: { type: 'text' },},
  },
};

export default meta;
type Story = StoryObj<typeof HeaderAdminCards>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
/**
 * Main Button with using the theme
 */
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
	tabs: [ 'General', 'Settings', 'Users' ],
	activeTab: 'general',
	title: 'title',
	about: 'about',
	description: 'Description of the page',
  },
};

export const AddCards: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
	tabs: [ 'General', 'Settings', 'Users' ],
	activeTab: 'settings',
	title: 'title',
	about: 'about',
	new_requests: 3,
	old_requests: 5,
	description: 'Description of the page',
  },
};

export const AddCardsTwo: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
	tabs: [ 'General', 'Settings', 'Users' ],
	activeTab: 'security',
	title: 'title',
	new_requests: 3,
  },
};

export const AddCardsThree: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
	tabs: [ 'General', 'Settings', 'Users' ],
	activeTab: 'security',
	title: 'title',
	about: 'about',
	new_requests: 3,
	description: 'Description of the page',
  },
};

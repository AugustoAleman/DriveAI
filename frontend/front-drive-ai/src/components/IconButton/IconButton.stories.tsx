import type { Meta, StoryObj } from "@storybook/react";
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from "components/IconButton/IconButton";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined"
import GroupsIcon from '@mui/icons-material/Groups';
import FacebookIcon from '@mui/icons-material/Facebook';
import theme from "theme/theme";

//Creation of the meta data for the component Button
const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "color" },
    backgroundColor: { control: "color" },
    hoverColor: { control: "color" },
    width: { control: "text" },
    height: { control: "text" },
    borderRadius: { control: "text" },
    href: { control: "text" },
    shadow: { control: "boolean" },
    hoverShadow: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

//Creation of the stories for the component IconButton

//Default story
export const Favorite: Story = {
  args: {
    children:  <FavoriteBorderOutlined />,
  },
};

//Default story
export const SidebarGroup: Story = {
    args: {
      children:  <GroupsIcon />,
      color: theme.palette.accent.main,
      backgroundColor: "rgba(222, 77, 90, 0.2)",
      borderRadius: "20%",
      width: "4vw",
    },
};

//Default story
export const FooterFacebook: Story = {
    args: {
      children:  <FacebookIcon />,
      color: theme.palette.accent.main,
      backgroundColor: "#F7F7F7",
      borderRadius: "12%",
    },
};


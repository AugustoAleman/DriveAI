import type { StoryObj, Meta } from "@storybook/react";
import BigInfo from "components/BigInfo/BigInfo";
import theme from "theme/theme";

//Creation of the meta data for the component BigInfo
const meta: Meta<typeof BigInfo> = {
  title: "Components/BigInfo",
  component: BigInfo,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    imagePosition: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    backgroundColor: {
      control: "color",
    },
    imageAlign: {
      options: ["top", "center", "bottom"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BigInfo>;

// Creation of the stories for the component BigInfo

// Default story
export const Default: Story = {
    args: {
        children: "This is a sample text inside the BigInfo component.",
        image: "https://placekitten.com/g/200/300",
        imagePosition: "left",
        height: "500px",
        padding: "0px",
        backgroundColor: theme.palette.tertiary.main,
        imageWidth: "100%",
        imageHeight: "100%",
        imageAlign: "center",
    },
};


import type { Meta, StoryObj } from "@storybook/react";
import Testimony from "./Testimony";

/**
 * Testimony component, options change depending on the props given.
 */

const meta: Meta<typeof Testimony> = {
    title: "Components/Testimony",
    component: Testimony,
      tags: ['autodocs'],
      argTypes: {
        name: {control: "text"},
        position: {control: "text"},
        body: {control: "text"},
        elipseimg: {control: "text"},
      },
};

export default meta;
type Story = StoryObj<typeof Testimony>
export const Default: Story = {
    args: {
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.",
        name: "Humberto",
        position: "CEO",
        elipseimg: "https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png",
        colorname:  "#3d51ff",
        colorposition: "#0e1f51",
        colorbody: "#252525",
        colorbg: "#ffffff",
    },
};

export const TestimonyV1: Story = {
  args: {
      body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.",
      name: "Luciano",
      position: "Vice",
      elipseimg: "https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png",
      colorname:  "#3d51ff",
      colorposition: "#0e1f51",
      colorbody: "#242424",
      colorbg: "#ffffff",
  },
};

export const TestimonyV2: Story = {
  args: {
      body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.",
      name: "Luciano",
      position: "ceo",
      elipseimg: "https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png",
      colorname:  "#3d51ff",
      colorposition: "#0e1f51",
      colorbody: "#242424",
      colorbg: "#ffffff",
  },
};
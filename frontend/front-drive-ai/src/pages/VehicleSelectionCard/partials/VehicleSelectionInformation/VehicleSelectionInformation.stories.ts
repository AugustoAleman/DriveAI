import type { Meta, StoryObj} from "@storybook/react";
import VehicleSelectionInformation from "./VehicleSelectionInformation";
import theme from "theme/theme";

// Creation of the meta data for the componente VehicleSelectionInformation.stories.ts
const meta: Meta<typeof VehicleSelectionInformation> = {
    title:      "Components/VehicleSelectionInformation",
    component:  VehicleSelectionInformation,
    tags:       ["autodocs"],
    argTypes:   {
    },
};
export default meta;

type Story = StoryObj<typeof VehicleSelectionInformation>;

// Default story
export const Default: Story = {
    args: {},
};
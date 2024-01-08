import type { Meta, StoryObj } from "@storybook/react";
import theme from "theme/theme"
import CarCatalogCard from "./CarCatalogCard";
import { CarCatalogCardInformationProp } from "./types";


interface ObjectColors {
    color: string;
    index: number;
}

//Creation of the meta data for the component OptionInsurance
const meta: Meta<typeof CarCatalogCard> = {
    title:      "Components/CarCatalogCard",
    component:  CarCatalogCard,
    tags:       ["autodocs"],
    argTypes: {
        vehicleId: { control: 'number' },
        isAdmin: { control: 'boolean' },
        image: { control: 'text' },
        price: { control: 'number' },
        brand: { control: 'text' },
        subBrand: { control: 'text' },
        model: { control: 'number' },
        dealershipName: { control: 'text' },
        colors: { control: 'array' }, // assuming `ObjectColors` is an enum
        onClickFavorite: { action: 'clicked favorite' },
        onClickCompare: { action: 'clicked compare' },
        onClickSelected: { action: 'clicked selected' },
        onClickDelete: { action: 'clicked delete' },
      },
};
export default meta;

type Story = StoryObj<typeof CarCatalogCard>;

export const Default: Story= {
    args: {
      vehicleId: 1,
      isAdmin: true,
      image:
        'https://images.kavak.services/images/25558/EXTERIOR-frontSidePilotNear-1679075234446.jpeg?d=540x310',
      price: 20000,
      brand: 'Toyota',
      subBrand: 'Corolla',
      model: 2021,
      dealershipName: 'Toyota Dealership',
      colors: ["#D39B88", "#784F4F", "#2B4368", "#000000"],
      onClickFavorite: (value:any) => console.log(value),
      onClickCompare: (value: any) => console.log(value),
      onClickSelected: (value: any) => console.log(value),
      onClickDelete: (value: any) => console.log(value),
    },
  };
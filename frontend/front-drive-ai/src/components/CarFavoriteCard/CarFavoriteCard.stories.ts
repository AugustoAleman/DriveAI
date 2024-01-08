import type { Meta, StoryObj } from "@storybook/react";
import CarFavoriteCard from "./CarFavoriteCard";

//Creation of the meta data for the component OptionInsurance
const meta: Meta<typeof CarFavoriteCard> = {
    title:      "Components/CarFavoriteCard",
    component:  CarFavoriteCard,
    tags:       ["autodocs"],
    argTypes: {
        image: { control: 'text' },
        price: { control: 'number' },
        brand: { control: 'text' },
        subbrand: { control: 'text' },
        model: { control: 'number' },
        elements : { control : 'array'},
        onClickFavorite: { action: 'clicked favorite' },
        onClickSelected: { action: 'clicked selected' },
      },
};
export default meta;

type Story = StoryObj<typeof CarFavoriteCard>;

export const Default: Story= {
    args: {
      image:
        'https://images.kavak.services/images/25558/EXTERIOR-frontSidePilotNear-1679075234446.jpeg?d=540x310',
      price: 20000,
      brand: 'Toyota',
      subbrand: 'Corolla',
      model: 2021,
      elements: ['Fuel', 'Engine', 'Traction'],
      onClickFavorite: (value:any) => console.log(value),
      onClickSelected: (value: any) => console.log(value),
    },
  };
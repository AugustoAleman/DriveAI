import type { Meta, StoryObj } from "@storybook/react";
import FilterListIcon from '@mui/icons-material/FilterList';
import LargeCarCard from "components/LargeCarCard/LargeCarCard";

import theme from "theme/theme";

//Creation of the meta data for the component Button
const meta: Meta<typeof LargeCarCard> = {
  title: "Components/LargeCarCard",
  component: LargeCarCard,
  tags: ["autodocs"],
  argTypes: {
    image: { control: "text" },
    brand: { control: "text" },
    model: { control: "text" },
    year: { control: "number" },
    price: { control: "number" },
    installments: { control: "number" },
    purchaseDate: { control: "text" },
    seller: { control: "text" },
    location: { control: "text" },
    time: { control: "text" },
    documentStatus: { control: "text" },
    driveTestStatus: { control: "text" },
    saleStatus: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof LargeCarCard>;

//Creation of the stories for the component Button

// Default story
export const Comprado: Story = {
  args: {
    variant: 0,
    fuelType: "Gasolina",
    installments:27000,
    purchaseDate: new Date().toISOString().split('T')[0],
    seller: "Josefina Garcia",
    location: "Coyoacan, CDMX",
  },
};

//Example of a "save" button
export const EnProceso: Story = {
  args: {
    variant: 0,
    seller: "Josefina Garcia",
    location: "Coyoacan, CDMX",
    documentStatus: "Aprobado",
    driveTestStatus: "Prueba de manejo solicitada",
  },
};

//Example of a "save" button
export const PruebaManejo: Story = {
  args: {
    variant: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    time: "10:00",
    seller: "Josefina Garcia",
    location: "Av Sor Juana Inés de La Cruz #78, San Lorenzo, 54000 Tlalnepantla de Baz, Méx",
    driveTestStatus: "Prueba de manejo agendada",
  },
};

//Example of a "save" button
export const Detalles: Story = {
  args: {
    variant: 1,
    fuelType: "Gasolina",
    installments:27000,
    purchaseDate: new Date().toISOString().split('T')[0],
    location: "Coyoacan, CDMX",
  },
};
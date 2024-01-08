import type { Meta, StoryObj } from "@storybook/react";
import theme from "theme/theme"
import VehicleCatalog from "./VehiclesCatalog";
import { VehicleCatalogProp } from "./types";

interface ObjectColors {
    color: string;
    index: number;
};

interface Car {
    index: number;
    isAdmin: boolean;
    image: string;
    price: number;
    brand: string;
    subbrand: string;
    model: number;
    dealership: string;
    colors: ObjectColors[];
};

//Creation of the meta data for the component VehicleCatalog
const meta: Meta<typeof VehicleCatalog> = {
    title: "Components/VehicleCatalog",
    component: VehicleCatalog,
    tags: ["autodocs"], 
    argTypes: {
        carlist: {control: 'array'},
        OnButtonClickFavorite:  { action: 'clicked favorite' },
        OnButtonClickCompare: { action: 'clicked compare' },
        OnButtonClickSelected: { action: 'clicked selected' },
        OnButtonClickDelete: { action: 'clicked delete' },
    },
};

export default meta;

type Story = StoryObj<typeof VehicleCatalog>;

export const Default: Story = {
    args: {
        carlist: [
           {dealershipVehicleId: 1, 
            image: 'https://images.kavak.services/images/25558/EXTERIOR-frontSidePilotNear-1679075234446.jpeg?d=540x310', 
            price: 20000, 
            brand: 'Toyota', 
            subBrand: 'Corolla', 
            model: 2021, 
            dealershipName: 'Toyota coyoacan',
            favorite: false,
            colors: ["#D39B88", "#784F4F", "#2B4368", "#000000"]},
            {dealershipVehicleId: 2, 
            image: 'https://images.prd.kavak.io/eyJidWNrZXQiOiJrYXZhay1pbWFnZXMiLCJrZXkiOiJpbWFnZXMvMjQ0ODcyL0VYVEVSSU9SLWZyb250U2lkZVBpbG90TmVhci0xNjgxNDk0NTY5NDA4LmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjU0MCwiaGVpZ2h0IjozMTB9fX0=', 
            price: 370000, 
            brand: 'Honda', 
            subBrand: 'Civic', 
            model: 2019, 
            dealershipName: 'Honda Miramontes (sucursal vaqueritos)',
            favorite: false,
            colors: ["#D39B88", "#784F4F", "#2B4368", "#000000"]},
            {dealershipVehicleId: 2, 
            image: 'https://images.prd.kavak.io/eyJidWNrZXQiOiJrYXZhay1pbWFnZXMiLCJrZXkiOiJpbWFnZXMvMjQ0ODcyL0VYVEVSSU9SLWZyb250U2lkZVBpbG90TmVhci0xNjgxNDk0NTY5NDA4LmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjU0MCwiaGVpZ2h0IjozMTB9fX0=', 
            price: 370000, 
            brand: 'Honda', 
            subBrand: 'Civic', 
            model: 2019, 
            dealershipName: 'Honda Miramontes (sucursal vaqueritos)',
            favorite: true,
            colors: ["#D39B88", "#784F4F", "#2B4368", "#000000"]},
                
        ],
        isAdmin: true,
        OnButtonClickFavorite: (value:any) => console.log(value),
        OnButtonClickCompare: (value:any) => console.log(value),
        OnButtonClickSelected: (value:any) => console.log(value),
        OnButtonClickDelete: (value:any) => console.log(value),
    },
};
import type { Meta, StoryObj } from "@storybook/react";

import ComparisonColumn from "components/ComparisonColumn/ComparisonColumn";

const meta: Meta<typeof ComparisonColumn> = {
    title: "Components/ComparisonColumn",
    component: ComparisonColumn,
    tags: ["autodocs"],
    argTypes: {
        path: { control: "text" },
        name: { control: "text" },
        dealership: { control: "text" },
        price: { control: "text" },
        model: { control: "text" },
        transmissionType: { control: "text" },
        paymentPlan: { control: "text" },
        testDriveAvailable: { control: "text" },
        fuelType: { control: "text" },
        deliveryTime: { control: "text" },
    },
}

export default meta;
type Story = StoryObj<typeof ComparisonColumn>;

export const Alt1: Story = {
    args: {
        path: "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/volkswagen-beetle_0.jpg?itok=iwppdYqU",
        name: "Volkswagen - Beetle",
        dealership: "Volkswagen - Santa Fe",
        price: "245,495,395",
        model: "2023",
        transmissionType: "Automatico",
        paymentPlan: "Pagos mensuales de $300,000",
        testDriveAvailable: "Prueba de manejo disponible",
        fuelType: "Eléctrico",
        deliveryTime: "Entrega en aprox 2 dias",
    }
}

export const Alt2: Story = {
    args: {
        path: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/styles/2400/public/media/image/2021/05/rivales-audi-r8-2329767.jpg?itok=otdxCm-6",
        name: "Audi - R8",
        dealership: "Audi Center Cuernavaca",
        price: "1,290,000",
        model: "2023",
        transmissionType: "Manual",
        paymentPlan: "Pagos mensuales de $30,000",
        testDriveAvailable: "Prueba de manejo no disponible",
        fuelType: "Gasolina",
        deliveryTime: "Entrega en aprox 1 mes",
    }
}

export const Alt3: Story = {
    args: {
        path: "https://www.autonocion.com/wp-content/uploads/12272172691012422470.jpg",
        name: "Nissan -  Sentra",
        dealership: "Nissan Imperio Automotriz Coapa",
        price: "350,500",
        model: "2019",
        transmissionType: "Automatico",
        paymentPlan: "Pagos mensuales de $2,150",
        testDriveAvailable: "Prueba de manejo disponible",
        fuelType: "Gasolina",
        deliveryTime: "Entrega en aprox 1 semana",
    }
}
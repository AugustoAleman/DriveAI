import type {Meta, StoryObj} from  "@storybook/react";
import RefusedD from "./RefusedD";
/**
 * Refused Document component, options change depending on the props given.
 */
const meta: Meta<typeof RefusedD> = {
    title: "Components/Documents",
    component: RefusedD,
    tags: ['autodocs'],
    argTypes: {
        textOne: {control: "text"},
        textTwo: {control: "text"},
        textFour: {control: "text"},
        textSix: {control: "text"},
        textEight: {control: "text"},
    },
};

export default meta;
type Story = StoryObj<typeof RefusedD>;

export const Refused: Story = {
    args: {
        textOne: "Denegados Documentos",
        colorOne: "#000000",
        textTwo: "Lo sentimos",
        colorTwo: "#000000",
        textFour: "Para más detalles consulta tu correo electrónico",
        colorFour: "#78787b",
        textSix: "Tus documentos fueron rechazados",
        colorSix: "#78787b",
        textEight: "Volver a subir documentos",
        bgcolor: "#ffffff",
        colorRefused: "#e04c74",
    },
};

export const RefusedV2: Story = {
    args: {
        textOne: "Documentos rechazados",
        colorOne: "#000000",
        textTwo: "Lo sentimos",
        colorTwo: "#000000",
        textFour: "Para más detalles consulta tu correo electrónico",
        colorFour: "#58585b",
        textSix: "Tus documentos fueron rechazados",
        colorSix: "#58585b",
        textEight: "Volver a subir documentos",
        bgcolor: "#ffffff",
        colorRefused: "#e04c74",
    },
};

export const RefusedV3: Story = {
    args: {
        textOne: "Documentos requeridos denegados",
        colorOne: "#000000",
        textTwo: "Lo sentimos",
        colorTwo: "#000000",
        textFour: "Para más detalles consulte su correo electrónico",
        colorFour: "#78787b",
        textSix: "Tus documentos fueron rechazados",
        colorSix: "#78787b",
        textEight: "Volver a subir documentos",
        bgcolor: "#ffffff",
        colorRefused: "#383434",
    },
};

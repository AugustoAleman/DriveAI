
import type {Meta, StoryObj} from  "@storybook/react";
import AcceptedD from "./AcceptedD";

/**
 * Accepted Document component, options change depending on the props given.
 */
const meta: Meta<typeof AcceptedD> = {
    title: "Components/Documents",
    component: AcceptedD,
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
type Story = StoryObj<typeof AcceptedD>;

export const Accepted: Story = {
    args: {
        textOne: "Confirmación de documentos",
        colorOne: "#000000",
        textTwo: "¡Todo Listo!",
        colorTwo: "#000000",
        textFour: "Ya puedes continuar con tu proceso",
        colorFour: "#78787b",
        textSix: "Tus documentos han sido verificados",
        colorSix: "#78787b",
        textEight: "Ok",
        bgcolor: "#ffffff",
        colorAccepted: "#48ac8c",
        
    },
};

export const AcceptedV2: Story = {
    args: {
        textOne: "Confirmación de documentos",
        colorOne: "#000000",
        textTwo: "¡Todo Listo!",
        colorTwo: "#000000",
        textFour: "Ya puedes continuar con tu proceso",
        colorFour: "#68686b",
        textSix: "Tus documentos han sido verificados",
        colorSix: "#78787b",
        textEight: "Ok",
        bgcolor: "#ffffff",
        colorAccepted: "#48ac8c",
        
    },
};

export const AcceptedV3: Story = {
    args: {
        textOne: "Confirmación de documentos requeridos",
        colorOne: "#000000",
        textTwo: "¡Todo Listo!",
        colorTwo: "#000000",
        textFour: "Puede continuar con tu proceso",
        colorFour: "#58585b",
        textSix: "Tus documentos han sido verificados",
        colorSix: "#58585b",
        textEight: "Ok",
        bgcolor: "#ffffff",
        colorAccepted: "#48ac8c",
        
    },
};
import type {Meta, StoryObj} from  "@storybook/react";
import ReviewD from "./ReviewD";

/**
 * Document under Review component, options change depending on the props given.
 */
const meta: Meta<typeof ReviewD> = {
    title: "Components/Documents",
    component: ReviewD,
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
type Story = StoryObj<typeof ReviewD>;

export const Review: Story = {
    args: {
        textOne: "Confirmación de documentos requeridos",
        colorOne: "#000000",
        textTwo: "Tus documentos están en revisión",
        colorTwo: "#000000",
        textFour: "Nos pondremos en contacto contigo una vez que sean validados",
        colorFour: "#68686b",
        textSix: "Hemos recibido tus documentos",
        colorSix: "#78787b",
        textEight: "Ok",
        bgcolor: "#ffffff",
        colorReview: "#383434",
    },
};

export const ReviewV2: Story = {
    args: {
        textOne: "Confirmación de documentos",
        colorOne: "#000000",
        textTwo: "Tus documentos están en revisión",
        colorTwo: "#000000",
        textFour: "Nos pondremos en contacto contigo una vez que sean validados",
        colorFour: "#58585b",
        textSix: "Hemos recibido tus documentos",
        colorSix: "#58585b",
        textEight: "Ok",
        bgcolor: "#ffffff",
        colorReview: "#383434",
    },
};

export const ReviewV3: Story = {
    args: {
        textOne: "Confirmación de documentos",
        colorOne: "#000000",
        textTwo: "Tus documentos se encuentran en revisión",
        colorTwo: "#000000",
        textFour: "Nos pondremos en contacto contigo una vez que sean validados",
        colorFour: "#78787b",
        textSix: "Hemos recibido tus documentos",
        colorSix: "#78787b",
        textEight: "Ok",
        bgcolor: "#ffffff",
        colorReview: "#383434",
    },
};
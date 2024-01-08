import type { Meta, StoryObj } from "@storybook/react";
import StepperComponent from "./Stepper";

/**
     * Story for Stepper Component.
     */

//Creation of the meta data for the component Card
const meta: Meta<typeof StepperComponent> = {
  title: "Components/Stepper",
  component: StepperComponent,
  tags: ["autodocs"],
  argTypes: {
    steps: {control: "array"},
  },
};

export default meta;
type Story = StoryObj<typeof StepperComponent>;

//Creation of the stories for the component Card

//Default story
export const Default: Story = {
    args: {
      steps: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5'],
  },
};

export const DrivingTest: Story = {
    args: {
      steps: ['Vehículo', 'Agencia', 'Horario', 'Documentos'],
  },
};

export const Buying: Story = {
    args: {
      steps: ['Planes de Pagos', 'Elige tu Plan de Seguros', 'Confirma tu selección'],
  },
};
  

  
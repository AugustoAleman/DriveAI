
import { Visa, Mastercard, Mastercard2 } from './IconsSvgBrands/IconsBRands';



interface Icons {
  [key: string]: JSX.Element;
}

export const SvgIconRender = ({ icon }: { icon: keyof Icons }) => {
  // Estructura de datos de iconos
  const icons: Icons = {
    visa: <Visa />, // Define el path del icono 1
    // Agrega más iconos aquí si es necesario
    mastercard: <Mastercard />, // Define el path del icono 1
    mastercard2: <Mastercard2 />, // Define el path del icono 1
  };

  // Renderiza el icono según el valor de la prop "icon"
  const selectedIcon = icons[icon];

  return selectedIcon;
};

export interface Card {
  id: string;
  icon?: keyof Icons;
  iconColor?: string;
  customerName: string;
  last4: string;
  exp_month: number,
  exp_year: number,
}

export interface CardListProps {
  cards: Card[];
  onDeleteCard: (cardId: string) => void;
}


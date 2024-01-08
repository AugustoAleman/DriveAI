import { styled } from '@mui/system';
import { Card, Typography} from '@mui/material';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { SvgIconRender } from './types';

export const CardContainer = styled(Card)({
  borderRadius: '16px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
  },
  width: '590px', // Adjust the card width here
});

export const CardIcon = styled(SvgIconRender)({
  color: '#0000f',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
    color: '#5c98ff',
  },
  '& .icon-center': {
    color: '#ff00ff', // Cambia el color del centro aquí
  },
});

export const CardNumber = styled(Typography)({
  letterSpacing: '0.1em',
  marginLeft: '16px', // Adjust the left margin here
  fontSize: '18px', // Cambia el tamaño de la letra aquí
});
export const CustomerName = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '4px', // Reduce the spacing here
  marginLeft: '16px', // Adjust the left margin here
});
export const Exp = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '4px', // Reduce the spacing here
  marginLeft: '16px', // Adjust the left margin here
});

export const DeleteButton = styled(FontAwesomeIcon)({
  fontSize: '1.3rem',
  color: '#000000', // Adjust the delete button color here
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
    color: '#ff0000', // Adjust the delete button hover color here
  },
});



export const PlusIcon = styled(Typography)`
  font-size: 1.1rem;
  color: #000000; /* Ajusta el color del icono "+" aquí */
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000; /* Ajusta el color del contorno del círculo aquí */
  border-radius: 50%;
  width: 24px;
  height: 24px;

  &:hover {
    transform: scale(1.2);
    color: #000000; /* Ajusta el color del icono "+" al pasar el cursor aquí */
  }
`;




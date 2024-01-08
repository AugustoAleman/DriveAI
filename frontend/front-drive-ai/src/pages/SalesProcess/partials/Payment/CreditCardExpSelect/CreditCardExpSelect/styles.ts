import { styled } from '@mui/system';
import { Card, Typography} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SvgIconRender } from './types';

export const CardContainer = styled(Card)({
  borderRadius: '16px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
  },
  width: '590px', // Ajusta el ancho de la tarjeta aquí
  height: '110px', // Ajusta la altura de la tarjeta aquí
  gap: 'px',
  display: 'center',
  alignItems: 'center', // Centra verticalmente el contenido
});
export const CardIcon = styled(SvgIconRender)({
  color: '#00ff00',
  transition: 'transform 0.3s ease-in-out',
  transform: 'scale(1)',
  fontSize: '8rem', // Ajusta el tamaño del icono aquí
  marginLeft: '1px',

  '&:hover': {
    transform: 'scale(1)',
    color: '#5c98ff',
  },
  '& .icon-center': {
    color: '#ff00ff', // Cambia el color del centro aquí
  },
});


export const CardNumber = styled(Typography)({
  letterSpacing: '0.1em',
  marginLeft: '16px', // Adjust the left margin here
  fontSize: '16px', // Cambia el tamaño de la letra aquí
});
export const CustomerName = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '4px', // Reduce the spacing here
  marginLeft: '16px', // Adjust the left margin here
});
export const Exp = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '1px', // Reduce the spacing here
  marginLeft: '20px', // Adjust the left margin here
  color: '#FF8888', // Cambia el color aquí
  fontSize: '0.1rem', // Ajusta el tamaño de la letra aquí

});

export const DeleteButton = styled(FontAwesomeIcon)({
  fontSize: '1.6rem',
  color: '#5DADE2',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  marginLeft: '80px',
  top: '10px',

  '&:hover': {
    transform: 'scale(1.2)',
    color: '#008000',
  },
});


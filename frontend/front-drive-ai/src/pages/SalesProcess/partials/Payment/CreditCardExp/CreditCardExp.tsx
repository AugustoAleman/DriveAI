import { CardContent, Grid, Box } from '@mui/material';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CardListProps } from './types';
import {
  CardContainer,
  CardIcon,
  CustomerName,
  CardNumber,
  DeleteButton,
  Exp,
} from './styles';

const CreditCardExp = ({ cards, onDeleteCard }: CardListProps) => {
  const handleDeleteClick = (cardId: string) => {
    onDeleteCard(cardId);
  };

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <CardContainer>
            <CardContent>
              <Box display="flex" alignItems="center">
                {card.icon ? (
                  <CardIcon icon={card.icon} />
                ) : (
                  <CardIcon icon="defaultIcon" /> // Icono predeterminado si no se proporciona uno en la tarjeta
                )}
                <Box flex={1} pl={6} pr={2}>
                  <Box display="flex" alignItems="center" mb={0.5}>
                    <CustomerName variant="subtitle1">
                      {card.customerName}
                    </CustomerName>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <CardNumber variant="h6">
                      **** **** **** {card.last4}
                    </CardNumber>
                  </Box>
                </Box>
                <Box flex={1} pl={2} pr={2}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Exp variant="h6" style={{ marginTop: '8px', marginLeft: '8px' }}>
                      Exp: {card.exp_month}/{card.exp_year}
                    </Exp>
                  </Box>
                </Box>
                <DeleteButton
                  icon={faTrashAlt}
                  aria-label="Eliminar tarjeta"
                  onClick={() => handleDeleteClick(card.id)}
                  style={{ marginRight: '8px' }} // Ajusta el margen derecho aquí
                />
              </Box>
            </CardContent>
          </CardContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default CreditCardExp;

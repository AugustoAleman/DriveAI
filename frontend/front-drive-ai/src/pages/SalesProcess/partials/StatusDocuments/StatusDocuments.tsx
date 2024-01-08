
import { AcceptedD } from 'components/AcceptedDocument'
import { ContainerAccepted } from './styles'
import Box from '@mui/material/Box';

const StatusDocuments = () => {
  return (
    
    <Box sx={{ display: 'flex', position: 'absolute', marginRight: '30rem'}}>
        <ContainerAccepted>
            <AcceptedD
                bgcolor='#ffffff'
                colorOne='#000000'
                textOne='Confirmación de documentos'
                colorTwo='#000000'
                textTwo='!Todo listo!'
                colorFour='#787878'
                textFour='Ya puedes continuar con tu proceso'
                colorSix='#787878'
                textSix='Tus documentos han sido verificados'
                colorAccepted='#48ac8c'
                textEight=''
            ></AcceptedD>
    </ContainerAccepted>
    </Box>
    
  )
}

export default StatusDocuments
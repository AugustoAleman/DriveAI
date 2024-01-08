import React from 'react'
import { 
    TittleSucces,
    TextSucces,
    ContainerSuccesful
 } from './styles'

const SuccessfulProcess = () => {
  return (
    <>
        <ContainerSuccesful elevation={3}>
            <TittleSucces>Proceso Finalizado</TittleSucces>
                <TextSucces>Usted ha finalizado satisfactoriamente el proceso de compra</TextSucces>
                <TextSucces>Gracias por usar DriveAI</TextSucces>
        </ContainerSuccesful>   
    </>
  )
}

export default SuccessfulProcess
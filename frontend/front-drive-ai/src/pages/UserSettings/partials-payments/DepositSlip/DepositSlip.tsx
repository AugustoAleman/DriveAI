import React from 'react'
import { Card } from 'components/Card';
import {
    DepositIcon,
    TextDeposit
} from './styles'

const DepositSlip = () => {
  return (
    <>
      <Card height='80px' width='150px' hasHoverColor={false} cursor='default' borderRadius='Small'>
          <DepositIcon/>
          <TextDeposit>Ficha de depósito</TextDeposit>
      </Card>
    </>
  )
}

export default DepositSlip
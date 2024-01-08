import React from 'react'
import { Card } from 'components/Card';
import {
    CreditIcon,
    TextCredit
}

from './styles'

const CreditCard = () => {
  return (
    <>
      <Card height='80px' width='150px' hasHoverColor={false} cursor='default' borderRadius='Small'>
          <CreditIcon/>
          <TextCredit>Tarjeta de crédito/débito</TextCredit>
      </Card>
    </>
  )
}

export default CreditCard
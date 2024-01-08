import React from 'react'
import { Card } from 'components/Card';
import PayPalImg from './assets/paypal-icon-vector-8.png'
import {
    PayPalImage,
    TextPayPal
} from './styles'

const PayPal = () => {
  return (
    <>
      <Card height='80px' width='150px' hasHoverColor={false} cursor='default' borderRadius='Small'>
          <PayPalImage src={PayPalImg}>
          </PayPalImage>
          <TextPayPal>PayPal T.credito/debito </TextPayPal>
      </Card>
    </>
  )
}

export default PayPal
import React, { useState, useEffect } from 'react'
import { PaperCard, TextNamePrice, TextPrice, IconPrice } from './styles'
import { CardPrice } from './types';

const CurrentPrice: React.FC<CardPrice> = ({
  valuePrice,
}) => {


  return (
    <div>
          <PaperCard square elevation={4} sx={{ p: 1 }}>
            <TextNamePrice>
                Precio Actual
            </TextNamePrice>
            <TextPrice>
                {valuePrice}
            </TextPrice>
            <IconPrice/>
        </PaperCard>
    </div>

  )
}

export default CurrentPrice
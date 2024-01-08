export const fetchPaymentMethods = async (setCards: (arg0: any) => void) => {
    try {
      const response = await fetch('https://stripee-production.up.railway.app/api/payment-methods2');
      const data = await response.json();
  
      const mappedCards = data.map((card: any, index: number) => ({
        id: String(index + 1),
        brand: card.brand,
        last4: card.last4,
        exp_month: card.exp_month,
        exp_year: card.exp_year,
        customerName: 'Fernando',
        icon: card.brand.toLowerCase(),
        iconColor: '#5c98ff',
        paymenId:card.id,
      }));
  
      setCards(mappedCards);
    } catch (error) {
      console.error(error);
    }
  };
  
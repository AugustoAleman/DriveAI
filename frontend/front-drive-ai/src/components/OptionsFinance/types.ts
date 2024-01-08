export interface OptionsFinanceProps {
  /**
   * Defining the props:
   /

  /**
   * "type" determines which option can be used in this component.
   * When using 'unique' as the prop's type value, it will only show a single price.
   * When using 'monthly' as the prop's type value, it will ask for enganche, plazo and mensualidades.
   */
  type?: 'unique' | 'monthly';

  /**
   * Recommended adds the recommendes stamp to the component.
   */
  recommended?: true | false;

  /**
   * If selected, then the card border will change its color to blue
   */
  selected?: true | false;

  /**
   * A function that will be called when the component is clicked.
   */
  onClick?: () => void;

  financingPlans: Array<any>;

  price: number;

  downPaymentSelection: any;

  setDownPaymentSelection: (value: any) => void;

  installmentSelection: any;

  setInstallmentSelection: (value: any) => void;

  paymentValueSelection: any;

  setPaymentValueSelection: (value: any) => void;
  
}

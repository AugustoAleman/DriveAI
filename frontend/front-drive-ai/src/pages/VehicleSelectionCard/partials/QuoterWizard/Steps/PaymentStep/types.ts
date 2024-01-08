export interface Option {
    id: number;
    recommended: boolean;
    type: "unique" | "monthly" | undefined;
    
}

export interface PaymentProps {
    options: Array<Option>;
    financingPlans: Array<any>;
    price: number;
    financingPlanSelection: number;
    setFinancingPlanSelection: (value: number) => void;
    downPaymentSelection: any;
    setDownPaymentSelection: (value: any) => void;
    installmentSelection: any;
    setInstallmentSelection: (value: any) => void;
    paymentValueSelection: any;
    setPaymentValueSelection: (value: any) => void;
    //title: string;
    //setTitle: (value: string) => void;
}
export interface QuoteBreakdownProps {
    brand: string;
    subBrand: string;
    version: string;
    price: number;
    financingPlans: Array<any>;
    insurancePlans: Array<any>;
    financingPlanSelection: number;
    setFinancingPlanSelection: (value: number) => void;
    downPaymentSelection: any;
    setDownPaymentSelection: (value: any) => void;
    installmentSelection: any;
    setInstallmentSelection: (value: any) => void;
    insurancePlanSelection: any;
    setInsurancePlanSelection: (value: any) => void;
    setInsuranceIndex: (value: number) => void;
}
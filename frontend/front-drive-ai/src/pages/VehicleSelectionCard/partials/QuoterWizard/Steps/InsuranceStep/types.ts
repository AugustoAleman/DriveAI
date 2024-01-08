export interface Option {
    cardIndex: number;
    text: string;
    imageUrl: string;
    width: number;
}

export interface InsuranceProps {
    
    insurancePlanSelection: any;
    setInsurancePlanSelection: (value: any) => void;
    insuranceIndex: any; 
    setInsuranceIndex: (value: any) => void;
    insurancePlans: Array<any>;
    insurancePaths: Array<string>;
}


export const calculateOpeningComission = (price: number) => {
    return (price * 0.03);
}

export const calculateInstallments = (price: number, downPayment: number, installments: number, interestRate: number) => {
    /*
    const monthlyInterest = (interestRate/ 100)/12
    const principal = price - downPayment
    const numerator = principal * (monthlyInterest * Math.pow(1 + monthlyInterest, installments))
    const denominator = Math.pow(1 + monthlyInterest, installments) - 1
    const installmentCost = numerator / denominator
    */
    const installmentCost = (price - price*(downPayment/100)) * (1 + (interestRate/100)) / installments;
    return installmentCost;
}

export const calculateDownPayment = (price: number, downPayment: number) => {
    return ((downPayment * price)/100);
}

export const calculatePercentileInterestRate = (interestRate: number) => {
    return (interestRate * 100);
}

export const formatNumber = (unformatedNumber: number) => {
    return unformatedNumber.toLocaleString();
}

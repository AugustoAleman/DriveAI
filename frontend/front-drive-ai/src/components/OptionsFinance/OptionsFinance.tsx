import React from "react"; // importing React because we are using JSX

// Importing the Card component from the components folder and my props for the OptionsFinance component
import { Card } from "components/Card";
import { OptionsFinanceProps } from "./types";

// Import styles and themes
// import theme from "theme/theme";
// import { HeaderBox, TextBoxUnique, TextBoxMonthly } from "./styles";
import { TextBoxMonthly, TextBoxUnique, HeaderBox } from "./styles";
import { useWindowDimensions } from "hooks";
import { calculateInstallments } from "utils";
import { Box } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

/**
 * Brief header component that will be used for the OptionsFinance component
 */
const Header: React.FC<{ title: string ; recommendation: boolean }> = ({ title, recommendation }) => {

  if (recommendation)
  {
	  return (
			  <HeaderBox>
				<div className="container">
					<img src="/best-choice.png" className="recommended-icon" alt="Recommended" />
				</div>
				<h1>{title}</h1>
			  </HeaderBox>
			 );
  } else
  {
	  return (
			  <HeaderBox>
				<h1>{title}</h1>
			  </HeaderBox>
			 );
  }
};


/**
 * Options finance component that will be used to show the finance options for the user
 */
const OptionsFinance: React.FC<OptionsFinanceProps> = ({
													type = 'unique',
													recommended = true,
													selected = false,
													onClick,
													financingPlans,
													price,
													downPaymentSelection,
													setDownPaymentSelection,
													installmentSelection,
													setInstallmentSelection,
													paymentValueSelection,
													setPaymentValueSelection,
												}) => {



  const {width} = useWindowDimensions();
  let selection: string;

  if (selected)
  {
	selection = "5px solid blue";
  }
  else
  {
	selection = "none";
  }

  // Make it so select ignores any onClick action in them.
  function handleSelectClick(e: React.MouseEvent<HTMLSelectElement>) {
    e.stopPropagation();
  }

  const handleInstallmentSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	const selectedIndex = event.target.selectedIndex;
	const selectedPlan = financingPlans[selectedIndex - 1];
	setInstallmentSelection(selectedPlan);
	console.log("Mensualidades: " + installmentSelection + " " + selectedIndex);

  }

  const handleDownPaymentSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	const selectedIndex = event.target.selectedIndex;
	const selectedPlan = financingPlans[selectedIndex - 1];
	setDownPaymentSelection(selectedPlan);
	console.log("Enganche: " + downPaymentSelection+ " " + selectedIndex );

  }

  const handleInstallmentPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	const selectedPrice = parseFloat(event.target.value);
	let closestPlan = null;
	let closestDifference = Infinity;

	for (const downPaymentPlan of financingPlans) {
		for (const installmentPlan of financingPlans) {
		  const calculatedInstallment = calculateInstallments(price, downPaymentPlan.downPayment, installmentPlan.months, installmentPlan.interest);
		  const difference = Math.abs(selectedPrice - calculatedInstallment);
		
		if (difference < closestDifference){
			closestPlan = {
				downPayment: downPaymentPlan,
				installment: installmentPlan,
			};
			closestDifference = difference; 
		}
	}
	}
	if (closestPlan) {
		setDownPaymentSelection(closestPlan.downPayment);
		setInstallmentSelection(closestPlan.installment);
	}
  }

  // Render when finance option is unique
  const uniqueFinanceOption = (
    <Card height="322px" width={width > 440 ? '25.625em' : "20.5em"} borderRadius="Small" cursor="default" border={selection}>
		<Header title="De contado" recommendation={recommended}></Header>
		<TextBoxUnique>
				<p>Pago único de</p>
				<p>{price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
				{/** get the data from the api, for now is only some dummy data */}
		</TextBoxUnique>
	</Card>
  );

  // Render when finance option is monthly
  const monthlyFinanceOption = (
    <Card height="322px" width={width > 440 ? '25.625em' : "20.5em"} borderRadius="Small" cursor="default" border={selection}>
		<Header title="A meses" recommendation={recommended}></Header>
		<TextBoxMonthly>
			<div className="custom-one">
			<p>Enganche:</p>
			{financingPlans ? (
			<select onClick={handleSelectClick} onChange={handleDownPaymentSelectChange}>
				{downPaymentSelection ? <option value="">{downPaymentSelection.downPayment} %</option> : <option value="">Sin enganche</option>}
				{financingPlans?.map((plan, index) =>(
                    <option key={index + 1} value={`option${index + 1}`}>
                        {plan.downPayment} %
                    </option>
                ))}
			</select>
			) : null}
			</div>

			<div className="custom-one">
			<p>Plazo:</p>
			{financingPlans ? (
			<select onClick={handleSelectClick} onChange={handleInstallmentSelectChange}>
				{installmentSelection ? <option value="">{installmentSelection.months} meses</option> : <option value="">Sin mensaualidades</option>}
				{financingPlans?.map((plan, index) =>(
                    <option key={index + 1} value={`option${index + 1}`}>
                        {plan.months} meses
                    </option>
                ))}
			</select>
			) : null}
			</div>
			<div className="custom-one">
			<p>Mensualidad:</p>
			<FormControl sx={{ m: 1, width: '122px' }}>
				<OutlinedInput
					id="outlined-adornment-amount"
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
					size="small"
					sx = {{ height: '32px'}}
					onChange={handleInstallmentPriceChange}
				/>
        	</FormControl>
			</div>

			<Box sx={{ borderTop: "3px solid red", width: "75%"}} />

			<p>{installmentSelection ? `${installmentSelection.months} pagos de` : " "}</p>
			<p>{(downPaymentSelection && installmentSelection) ? `${calculateInstallments(price, downPaymentSelection.downPayment, installmentSelection.months, installmentSelection.interest).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}` : " - "}</p>

			{/** get the data from the api, for now is only some dummy data */}
		</TextBoxMonthly>
	</Card>
  );

  return (
	<div onClick={onClick}>
		{type === "unique" ? uniqueFinanceOption : monthlyFinanceOption}
	</div>
  );
};

export default OptionsFinance;

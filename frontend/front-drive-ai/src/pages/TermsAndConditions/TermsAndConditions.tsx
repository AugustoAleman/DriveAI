import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Box } from "@material-ui/core";

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .02)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function TermsAndConditions() {
	const [expanded, setExpanded] = React.useState<string | false>("panel1");

	const handleChange =
		(panel: string) =>
		(event: React.SyntheticEvent, newExpanded: boolean) => {
			setExpanded(newExpanded ? panel : false);
		};

	return (
		<>
			<Box
				sx={{
					marginLeft: "10rem",
					marginTop: "3rem",
				}}
			>
				<h1> Términos y condiciones </h1>
			</Box>
			<Box
				sx={{
					marginLeft: "10.02rem",
					marginRight: "10.02rem",
					marginTop: "1rem",
					marginBottom: "2rem"
				}}
			>
				<Accordion
					expanded={expanded === "panel1"}
					onChange={handleChange("panel1")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
					>
						<Typography>
							IMPORTANTE: FAVOR DE LEER CUIDADOSAMENTE LOS
							TÉRMINOS Y CONDICIONES PREVIO DEL USO DE LA PÁGINA
							WEB DE DRIVE-AI.
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							El presente documento contiene los términos y
							condiciones generales aplicables al acceso y/o uso
							de los servicios que ofrece Drive-AI, patrocinada
							por NDS Cognitive Labs (en adelante "Drive-AI"), a
							sus clientes a través de su sitio web
							www.drive-ai.com (el "Sitio Web") y/o cualquier otra
							extensión de la plataforma.
						</Typography>

						<br />

						<Typography textAlign="justify">
							Cualquier persona que desee acceder o que acceda, a
							través de cualquier medio autorizado por Drive-AI, a
							los servicios en general que ofrece Drive-AI,
							descritos en estos Términos y Condiciones (los
							"Servicios"), o que desee acceder y/o hacer uso del
							Sitio Web o cualquier otra extensión de la
							plataforma autorizada por Drive-AI (denominados en
							conjunto, a efectos de estos Términos y Condiciones
							como la "Plataforma Drive-AI"), quedará sujeto a los
							Términos y Condiciones junto con todas las demás
							políticas y principios que rigen a Drive-AI y que
							son incorporados al presente por referencia.
						</Typography>
						<br />
						<Typography textAlign="justify">
							En caso de que alguna persona no desee someterse a
							estos Términos y Condiciones, deberá abstenerse de
							acceder y/o usar la Plataforma Drive-AI, así como de
							acceder o intentar acceder, a través de la
							Plataforma y/o de cualquier medio autorizado por
							Drive-AI, a los Servicios que Drive-AI ofrece a sus
							clientes.
						</Typography>

						<br />

						<Typography fontWeight="bold" textAlign="justify">
							TÉRMINOS Y CONDICIONES GENERALES DEL ACCESO Y/O USO
							DE LOS SERVICIOS QUE OFRECE DRIVE-AI A SUS CLIENTES,
							A TRAVÉS DE LA PLATAFORMA DRIVE-AI.
						</Typography>

						<br />

						<Typography textAlign="justify">
							Los Términos y Condiciones generales del acceso y/o
							uso de los Servicios que ofrece Drive-AI a sus
							clientes, a través del Sitio Web y/o de cualquier
							otra extensión de la Plataforma, publicados en la
							Plataforma (en adelante, los "Términos y
							Condiciones"), son obligatorios entre usted (el
							"Arrendatario", el "Permutante", el "Cliente", el
							"Usuario" y/o el "Vendedor") y Drive-AI (en
							conjunto, denominados como las "Partes"), por lo
							tanto, constituyen un acuerdo total entre ambas
							Partes para el uso del Sitio Web, y/o cualquier otra
							extensión de la Plataforma Drive-AI, incluyendo la
							prestación de los servicios que Drive-AI pone a
							disposición a través de la Plataforma Drive-AI y/o
							de cualquier otra forma en la que Drive-AI autorice
							o ponga a disposición para prestar los mismos.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</Box>
		</>
	);
}

export default TermsAndConditions;

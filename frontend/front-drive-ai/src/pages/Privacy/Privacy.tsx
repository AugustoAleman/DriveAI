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

function Privacy() {
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
				<h1> Política de privacidad </h1>
			</Box>
			<Box
				sx={{
					marginLeft: "10.02rem",
					marginRight: "10.02rem",
					marginTop: "1rem",
					marginBottom: "2rem",
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
							IMPORTANTE: FAVOR DE LEER CUIDADOSAMENTE EL AVISO DE
							PRIVACIDAD DE DRIVE-AI.
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							Este Acuerdo de Privacidad establece las políticas y
							procedimientos para el manejo y protección de la
							información personal de los clientes de Drive-AI,
							patrocinada por NDS Cognitive Labs (en adelante
							"Drive-AI"). En Drive-AI, entendemos la importancia
							de proteger la privacidad de nuestros clientes y nos
							comprometemos a mantener la confidencialidad y
							seguridad de la información que recopilamos.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion
					expanded={expanded === "panel2"}
					onChange={handleChange("panel2")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
					>
						<Typography>1. Servicios ofrecidos</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							Drive-AI ofrece servicios de venta de autos nuevos a
							través del presente sitio web. Estos servicios
							incluyen la búsqueda, visualización, selección y
							compra de vehículos disponibles en el inventario de
							Drive-AI. Los detalles específicos de cada
							transacción y los términos y condiciones adicionales
							se establecerán en el momento de la compra.
							<br />
							<ul>
								<li>Nombre completo</li>

								<li>Dirección de correo electrónico</li>

								<li>Número de teléfono</li>

								<li>Información demográfica relevante</li>
							</ul>
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion
					expanded={expanded === "panel3"}
					onChange={handleChange("panel3")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
					>
						<Typography>
							2. Acceso y uso de la página web{" "}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							Usted es responsable de garantizar el acceso y uso
							adecuado del Sitio Web de Drive-AI. Se compromete a
							utilizar el Sitio Web y los servicios proporcionados
							de acuerdo con la ley aplicable y estos Términos y
							Condiciones. Drive-AI se reserva el derecho de
							suspender o cancelar su acceso al Sitio Web en caso
							de incumplimiento de estos Términos y Condiciones.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion
					expanded={expanded === "panel4"}
					onChange={handleChange("panel4")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
					>
						<Typography>
							3. Protección de la información personal{" "}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							Drive-AI implementa medidas de seguridad adecuadas
							para proteger la información personal de nuestros
							clientes contra pérdida, uso indebido, acceso no
							autorizado, divulgación o alteración. Solo el
							personal autorizado de Drive-AI tendrá acceso a la
							información personal y se le exigirá mantener la
							confidencialidad de dicha información.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion
					expanded={expanded === "panel5"}
					onChange={handleChange("panel5")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
					>
						<Typography>
							4. Consentimiento y elección del cliente{" "}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							Al utilizar los servicios de Drive-AI, el cliente
							otorga su consentimiento para la recopilación y uso
							de su información personal de acuerdo con los
							términos establecidos en este Acuerdo de Privacidad.
							El cliente tiene el derecho de retirar su
							consentimiento en cualquier momento, así como
							acceder, corregir o eliminar su información
							personal. Para ejercer estos derechos, el cliente
							puede comunicarse con Drive-AI a través de los
							canales de contacto proporcionados.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={expanded === "panel6"}
					onChange={handleChange("panel6")}
				>
					<AccordionSummary
						aria-controls="panel1d-content"
						id="panel1d-header"
					>
						<Typography>
							5. Modificaciones al acuerdo de privacidad{" "}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography textAlign="justify">
							Drive-AI se reserva el derecho de modificar este
							Acuerdo de Privacidad en cualquier momento. Las
							modificaciones entrarán en vigencia a partir de su
							publicación en nuestro sitio web. Se alienta a los
							clientes a revisar periódicamente este Acuerdo de
							Privacidad para estar informados sobre cómo se
							utiliza y protege su información personal.
						</Typography>

						<br />

						<Typography textAlign="justify">
							Al utilizar los servicios de Drive-AI, el cliente
							acepta los términos y condiciones establecidos en
							este Acuerdo de Privacidad y reconoce que Drive-AI
							podrá recopilar, utilizar y proteger su información
							personal de acuerdo con las disposiciones aquí
							establecidas.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</Box>
		</>
	);
}

export default Privacy;

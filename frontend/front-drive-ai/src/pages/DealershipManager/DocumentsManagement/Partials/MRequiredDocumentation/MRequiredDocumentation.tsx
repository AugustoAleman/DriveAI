import * as React from "react";
import { useState } from "react";
import {
    PageBackground,
    useStyles,
} from "./styles";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from '@mui/material/Autocomplete';
import {Box, Grid } from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {CardContent, TextField } from "@mui/material";
import {Card} from "components/Card";
import {Button} from "components/Button";
import { AddDocumentCardProps, DocumentationTableProps } from "./types";

const agency = [
    {
      value: 1,
      label: 'Agencia 1',
    },
    {
      value: 2,
      label: 'Agencia 2',
    },
    {
      value: 3,
      label: 'Agencia 3',
    },
    {
      value: 4,
      label: 'Agencia 4',
    },
  
  ];

  const proceso = [
    {
      value: 1,
      label: 'Proceso 1',
    },
    {
      value: 2,
      label: 'Proceso 2',
    },
    {
      value: 3,
      label: 'Proceso 3',
    },  
  ];

  const formato = [
    {
      value: 1,
      label: 'Formato 1',
    },
    {
      value: 2,
      label: 'Formato 2',
    },
    {
      value: 3,
      label: 'Formato 3',
    },  
  ];

const createData = (
    document_name: string,
    process: string,
    format: string,
    date: string
) => {
    return {document_name, process, format, date};
}

const rows = [
    createData("Licencia", "Venta", "pdf", "12/12/2021"),
    createData("Licencia", "Venta", "pdf", "12/12/2021"),
    createData("Licencia", "Venta", "pdf", "12/12/2021"),
    createData("Licencia", "Venta", "pdf", "12/12/2021"),
];

const secondRows = [
    createData("Licencia B", "Prueba de manejo", "pdf", "01/01/2022"),
    createData("Identificación", "Prueba de manejo", "pdf", "01/01/2022"),
    createData("Comprobante de domicilio", "Prueba de manejo", "pdf", "01/01/2022"),
];

const availableProcesses = ["Proceso 1", "Proceso 2", "Proceso 3"];
const availableFormats = ["Format 1", "Format 2", "Format 3"];

function DocumentationTable({ process, handleChangeProcess, format, handleChangeFormat, title, subtitle, rowsData}: DocumentationTableProps) {

    const [processOp, setProcessOp] = useState(proceso[0]);

    const handlePlanChange1 = (event:any, newValue:any) => {
        setProcessOp(newValue);
    };

    const [formatOp, setFormatOp] = useState(formato[0]);

    const handlePlanChange2 = (event:any, newValue:any) => {
        setFormatOp(newValue);
    };

    return (
        <Box sx={{maxWidth: "100%", overflow: "auto", borderRadius: "25px"}}>
            <Card
                height="auto"
                width="100%"
                borderRadius="Medium"
                shadow="4px 4px 12px rgba(0, 0, 0, 0.5)"
                padding="0px"
                margin="0px"
                cursor="default"
            >
                <TableContainer style={{maxHeight: 480, backgroundColor: "white", paddingBottom: "5px"}}>
                    <h2 style={{paddingLeft: 50, paddingTop: 10}}>
                        {title}
                    </h2>
                    <h3 style={{paddingLeft: 50, paddingBottom: 10}}>
                        {subtitle}
                    </h3>
                    <Table aria-label="simple table">
                        <TableHead aria-label="sticky table">
                            <TableRow>
                                <TableCell align="center" style={{fontWeight: "bold"}}>Nombre (documento requerido)</TableCell>
                                <TableCell align="center" style={{fontWeight: "bold"}}>Proceso</TableCell>
                                <TableCell align="center" style={{fontWeight: "bold"}}>Format</TableCell>
                                <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" style={{ color: "blue", fontWeight: "bold" }}>{row.document_name}</TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="Fist filter"
                                            options={proceso}
                                            getOptionLabel={(option) => option.label}
                                            onChange={handlePlanChange1}
                                            renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            color="primary"
                                            sx={{ width: '88px'}}
                                            />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="Fist filter"
                                            options={formato}
                                            getOptionLabel={(option) => option.label}
                                            onChange={handlePlanChange2}
                                            renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            color="primary"
                                            sx={{ width: '88px'}}
                                            />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}

function AddDocumentCard({ inputFields, handleInputChange, handleAddButtonClick }: AddDocumentCardProps) {
    return (
        <Card
            height="100%"
            width="100%"
            borderRadius="Medium"
            shadow="2px 2px 7px rgba(0, 0, 0, 0.3)"
            padding="20px"
            margin="0px"
            cursor="default"
        >
            <CardContent>
                <h2 style={{paddingLeft: 20}}>
                    Agregar documento
                </h2>
                <TextField
                    name="field1"
                    label="Documento"
                    value={inputFields.field1}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="field2"
                    label="Formato"
                    value={inputFields.field2}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Box display="flex" justifyContent="flex-end" width="100%" paddingTop={4}>
                    <Button
                        onClick={handleAddButtonClick}
                        hoverShadow={true}
                    >
                        Añadir
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

const MRequiredDocumentation = () => {

    const classes = useStyles();
    const [process, setProcess] = React.useState(rows.map((row) => ""));
    const [format, setFormat] = React.useState(rows.map((row) => ""));
    const [inputFields, setInputFields] = React.useState({ field1: "", field2: "" });

    const [secondProcess, setSecondProcess] = React.useState(rows.map((row) => ""));
    const [secondFormat, setSecondFormat] = React.useState(rows.map((row) => ""));
    const [secondInputFields, setSecondInputFields] = React.useState({ field1: "", field2: "" });

    const handleChangeProcess = (event: SelectChangeEvent, rowIndex: number) => {
        const newProcess = [...process];
        newProcess[rowIndex] = event.target.value as string;
        setProcess(newProcess);
    };

    const handleChangeFormat = (event: SelectChangeEvent, rowIndex: number) => {
        const newFormat = [...format];
        newFormat[rowIndex] = event.target.value as string;
        setFormat(newFormat);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const handleAddButtonClick = () => {
        console.log("Add button clicked with values: ", inputFields);
        // Add your logic to handle the input fields values
    };

    const handleChangeSecondProcess = (event: SelectChangeEvent, rowIndex: number) => {
        const newProcess = [...secondProcess];
        newProcess[rowIndex] = event.target.value as string;
        setSecondProcess(newProcess);
    };

    const handleChangeSecondFormat = (event: SelectChangeEvent, rowIndex: number) => {
        const newFormat = [...secondFormat];
        newFormat[rowIndex] = event.target.value as string;
        setSecondFormat(newFormat);
    }

    const handleSecondInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondInputFields({ ...secondInputFields, [event.target.name]: event.target.value });
    };

    const handleSecondAddButtonClick = () => {
        console.log("Second add button clicked with values: ", secondInputFields);
        // Add your logic to handle the input fields values
    };


    return (
        <>
            <PageBackground>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} md={7}>
                        <DocumentationTable
                            process={process}
                            handleChangeProcess={handleChangeProcess}
                            format={format}
                            handleChangeFormat={handleChangeFormat}
                            title="Documentación requerida a clientes"
                            subtitle="Específica la documentación que se le pedirá a los clientes para realizar una compra."
                            rowsData={rows}
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <AddDocumentCard
                            inputFields={inputFields}
                            handleInputChange={handleInputChange}
                            handleAddButtonClick={handleAddButtonClick}
                        />
                    </Grid>
                </Grid>
                <div style={{paddingTop: 20}}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} md={7}>
                            <DocumentationTable
                                process={secondProcess}
                                handleChangeProcess={handleChangeSecondProcess}
                                format={secondFormat}
                                handleChangeFormat={handleChangeSecondFormat}
                                title="Documentación prueba de manejo"
                                subtitle="Específica la documentación que se le pedirá a los clientes para solicitar una prueba de manejo."
                                rowsData={secondRows}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <AddDocumentCard
                                inputFields={secondInputFields}
                                handleInputChange={handleSecondInputChange}
                                handleAddButtonClick={handleSecondAddButtonClick}
                            />
                        </Grid>
                    </Grid>
                </div>
            </PageBackground>
        </>
    );
};

export default MRequiredDocumentation;

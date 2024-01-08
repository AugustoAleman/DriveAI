import Select, {SelectChangeEvent} from "@mui/material/Select";

export interface AddDocumentCardProps {
    inputFields: { field1: string; field2: string };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddButtonClick: () => void;
}

export interface DocumentationTableProps {
    process: string[];
    handleChangeProcess: (event: SelectChangeEvent, rowIndex: number) => void;
    format: string[];
    handleChangeFormat: (event: SelectChangeEvent, rowIndex: number) => void;
    title: string;
    subtitle: string;
    rowsData: any[];
}
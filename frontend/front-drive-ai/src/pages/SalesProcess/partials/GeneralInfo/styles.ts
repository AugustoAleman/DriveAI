import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { MuiTelInput } from "mui-tel-input";
import Box from '@mui/material/Box';
import MUICard from '@mui/material/Card';
import TableContainerMUICard from '@mui/material/TableContainer';
import TableMUICard from '@mui/material/Table';
import TableHeadMUICard from '@mui/material/TableHead';
import TableRowMUICard from '@mui/material/TableRow';
import TableCellMUICard from '@mui/material/TableCell';
import TableBodyMUICard from '@mui/material/TableBody';


export const ContainerPrice = styled.div`
    float:right;
    margin-left: 55rem;
    margin-right: 0rem;
    

    @media (max-width: 769px){
        bottom: 690px;
        right: 250px;
        width:24px;
        z-index:9999;
    }
`

export const ContainerAllInfo = styled.div`
    margin-right: 15rem;
   
    @media (max-width: 1440px){
        top: 100px;  
    }
`


export const Card = styled(MUICard)`
  /* Your custom styles for Card */
`;

export const TableContainer = styled(TableContainerMUICard)`
  /* Your custom styles for TableContainer */
`;

export const Table = styled(TableMUICard)`
  /* Your custom styles for Table */
`;

export const TableHead = styled(TableHeadMUICard)`
  /* Your custom styles for TableHead */
`;

export const TableRow = styled(TableRowMUICard)`
  /* Your custom styles for TableRow */
`;

export const TableCell = styled(TableCellMUICard)`
  /* Your custom styles for TableCell */
`;

export const TableBody = styled(TableBodyMUICard)`
  /* Your custom styles for TableBody */
`;
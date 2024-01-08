import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
export const PageBackground = styled.div`
  font-family: "Roboto", sans-serif;
`;

export const PageBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 60px;
    
`;

export const ModalTitle = styled.td`
    font-size: 88%;
`;

export const ModalData = styled.td`
    font-size: 88%;
    font-weight: bold;
`;

export const ModalDivder = styled.hr`
    width: 217%;
`;

export const Active = styled.div`
    color: #09CD40;
    height: 100%;
    width: 100%;
    font-weight:bold;
`;

export const Progess = styled.div`
    color: #fc9917;
    height: 100%;
    width: 100%;
    font-weight:bold; 
`;

export const Inactive = styled.div`
    color: red;
    height: 100%;
    width: 100%;
    font-weight:bold;  
`;

export const useStyles = makeStyles((theme) => ({
    actionContainer: {
        marginRight: theme.spacing(5),
    },
    filterContainer: {
        width: "60%",
    },
    addButtonContainer: {
        width: "40%",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: theme.spacing(5),
    },
}));
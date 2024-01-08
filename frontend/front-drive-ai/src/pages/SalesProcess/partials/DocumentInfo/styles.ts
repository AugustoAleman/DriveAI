import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  buttonStyled: {
    transform: 'translate(66vw, 14vw)',
  },
  principalHeader: {
    margin: '1em',
  },
  tableContainer: {
    maxWidth: '85%',
    margin: '2em',
  },
  tablediv: {
    overflowX: 'auto',
  },
  table: {
    height: '100%',
    width: '100%',
    
  },

  TableCells: {
    width: '150px',
    textAlign: 'center',
  },
  iconCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    fontWeight: 'bold'
  },
  tableDivider: {
    borderRight: '1px solid black',
    color: 'blue',
    fontWeight: 'bold'
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  '@media (max-width: 767px)': {
    tableContainer: {
      maxWidth: '100%',
      margin: '1em',
    },
    table: {
      minWidth: '100%',
    },
    TableCells: {
      width: 'auto',
      textAlign: 'left',
      padding: '0.5em',
    },
    iconCell: {
      justifyContent: 'flex-start',
      paddingLeft: '1em',
    },
  },
});

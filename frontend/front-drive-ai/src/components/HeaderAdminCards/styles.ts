import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';
import styled from "styled-components";

export const TitlesDetails = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: row;
	gap: 2rem;
`;

export const NewFont = styled.h3`
		margin: 0rem;
		font-weight: 600;
		font-size: 2rem;
		color: #1E6AFC;
`;

export const OldFont = styled.h3`
		margin: 0rem;
		font-weight: 600;
		font-size: 2rem;
		color: #7000FF
`;

export const InsideCardContainer = styled.div`
	font-family: 'Roboto', sans-serif;
	margin-left: 2.5rem;
	display: flex;
	flex-direction: column;
	margin-right: 1.5rem;

	h4 {
		margin: 0rem;
		font-weight: 400;
	}
`;

export const InsideCard = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;

	// Title
	h5 {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
	}
`;

export const CardContainer = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	gap: 3.3rem;
	margin-left: 4rem;
	margin-bottom: 2rem;
`;

export const UserSpace = styled.div`
	font-family: 'Roboto', sans-serif;
	color: #000000;
	background: ${props => props.theme.background};
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
	border-bottom: 1px solid #979797;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
	padding-right: 0.8rem;

	h1 {
		font-family: 'Roboto', sans-serif;
		color: #000000;
		margin: 0px;
		padding: 0px;
		font-size: 40px;
	}

	h3 {
		font-family: 'Roboto', sans-serif;
		color: #979797;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 0px;
		font-size: 14px;
	}
`;

export const Header = styled.div`
	font-family: 'Roboto', sans-serif;
	color: #000000;
	margin-left: 50px;
	margin-bottom: 0.5rem;
	display: flex;
	flex-direction: column;

	h1 {
		font-family: 'Roboto', sans-serif;
		color: #000000;
		margin: 0px;
		padding: 0px;
		font-size: 40 px;
	}

	h3 {
		font-family: 'Roboto', sans-serif;
		font-weight: 300;
		color: #979797;
		margin-left: 3px;
		margin-bottom: 1px;
		padding: 1px;
	}
	a{
		text-decoration: none;
	}
	h4 {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		color: #979797;
		margin-left: 3px;
		margin-top: 1rem;
		margin-bottom: 0;
	}
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  padding: 0;
  margin-left: 50px;

  ul {
	  display: flex;
	  flex-direction: row;
	  justify-content: flex-start;
	  align-items: center;
	  list-style: none;
	  margin: 0;
	  padding: 0;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginLeft: 'auto',
      color: 'black',
      backgroundcolor: 'white',
      boxShadow: 'none',
      borderBottom: `1px solid #979797`,
    },

	rotatedIcon: {
		transform: 'rotate(-90deg) scale(1.2)',
	},

	iconButton: {
		marginRight: '0',
		marginLeft: '0',
	},
	bellButton: {
		marginRight: '0',
		marginLeft: '0',
	},

    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      minHeight: 80,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        minHeight: 140,
      },
    },
    accountSection: {
      backgroundColor: 'white',
      color: 'black',
      padding: theme.spacing(2, 2),
      textAlign: 'left',
    },

    userContainer: {
      display: 'flex',
	  justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(2, 1),
      },
    },
    userName: {
      fontWeight: 200,
	  padding: '15px',
    },
    sa: {
      color: 'black',
	  fontWeight: 200,
    },
    sectionDesktop: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0, 1),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
      },
    },
    sectionMobile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: theme.spacing(2),
      '& > *': {
        margin: theme.spacing(1, 1),
      },
    },
    divider: {
      justifyContent: 'flex-start',
      width: '100%',
      height: 1,
      backgroundColor: theme.palette.divider,
    },
    adminContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    breadcrumb: {
      color: 'black',

      backgroundColor: 'white',
      padding: theme.spacing(1, 1),
      '& > *': {
        margin: theme.spacing(0, 1),
      },
      textAlign: 'left', // Agregar esta línea para alinear a la izquierda
    },
    activeButton: {
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'left',
    },
    spaces: {
      color: 'black',
      padding: theme.spacing(2, 2),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1),
      textAlign: 'left', // Agregar esta línea para alinear a la izquierda
    },
  })
);

export default useStyles;

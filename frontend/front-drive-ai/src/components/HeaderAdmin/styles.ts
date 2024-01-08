import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    root2: {
      backgroundColor: '#fff',
      borderBottom: `2px solid #888`,
      borderTop: `2px solid #888`,
      
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      
      padding: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0),
      },
    },
    section: {
      borderRight: `2px solid #888`,

      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 3),
      minHeight: 65, // altura mínima de la sección
      '&:last-child': {
        borderRight: 'none',
      },
    },
    sectionFirst: {
      '&::before': {
        content: '""',
        height: '50%',
        borderBottom: `2px solid ${theme.palette.divider}`,
      },
    },
    hour: {
      paddingLeft: theme.spacing(2), // agrega un padding izquierdo
      borderLeft: `2px solid #888`,

      minHeight: 65, // altura mínima de la sección
      display: 'flex',
      alignItems: 'center',
    },
    sa: {
      color: '#888',
    },
    userName: {
      fontWeight: 600,
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '100%',
        height: '1px',
        width: '6px',
      },
    },
    divider: {
      height: '100%',
      borderRight: `3px solid ${theme.palette.divider}`,
    },
    notification: {
      marginLeft: theme.spacing(1),
    },
    appBar: {
      marginLeft:'left',

      backgroundColor: '#fff',
      color: '#333',
      boxShadow: 'none',
      borderBottom: `2px solid #888`,
    },
    toolbar: {
      textAlign: 'left', // Agregar esta línea para alinear a la izquierda

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
      color: '#fff',
      padding: theme.spacing(1, 1),
      textAlign: 'left',
    },
    userContainer: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      

      '& > *': {
        margin: theme.spacing(1, 1),
        position: 'relative',
        paddingRight: '40px', // se establece el mismo valor de paddingRight y paddingLeft
        paddingLeft: '10px', // para cada elemento hijo
      },
      
      '& > *:not(:last-child)::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        
        right: '0',
        width: '1px',
        height: '340%',
        backgroundColor: 'black',
      },
      
      '& > :first-child:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '-10px',
        right: '5px',

        width: '1px',
        height: '400%',
        backgroundColor: 'black',
      },
      
      '& > :nth-child(1):before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '5px',
        width: '1px',
        height: '400%',
        backgroundColor: 'black',
      },
      
      
    },
    

    
    
    
    
    
    
    
    
    
    sectionDesktop: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0, 0),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(0),
      },
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    button: {
      minWidth: 'auto',
      padding: 0,

      textTransform: 'none',
      marginRight: theme.spacing(2),
      borderBottom: '2px solid transparent',
      '&:hover': {
        
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      '&$selected': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    selected: {},
    sectionMobile: {
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: theme.spacing(0),
      '& > *': {
        margin: theme.spacing(1, 1),
      },
    },
    
    divider2: {
      
      justifyContent:'flex',
      width: '100%',
      height: 3,
      color: 'black',
      backgroundColor: theme.palette.divider,
    },
    
    link: {
      textDecoration: 'none', // Puedes agregar esta clase a tus enlaces
      color:   '#808080', // Cambia el color aquí
      // Estilo cuando el usuario pasa el cursor sobre el enlace
      '&:hover': {
        color: '#FF0000', // cambia el color de texto a rojo
        textDecoration: 'underline', // agrega subrayado
      },

    },
    adminContainer: {
      
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    breadcrumb: {
      
      color:  '#333333',
      
      padding: theme.spacing(1,0),
      '& > *': {
        margin: theme.spacing(0, 1),
      },
      textAlign: 'left', // Agregar esta línea para alinear a la izquierda
    },
    
    
    activeButton: {
      backgroundColor: '#FF6666',
      color: 'black',
      textAlign: 'left',
    },
    inactiveButton: {
      backgroundColor: 'transparent',
      color: 'black',
      textAlign: 'left',
    },
    spaces: {
      
      color: 'black',

      padding: theme.spacing(1, 3),
      paddingTop: theme.spacing(1.0),
      paddingBottom: theme.spacing(0),
      textAlign: 'left', // Agregar esta línea para alinear a la izquierda
    },
  })
);

export default useStyles;

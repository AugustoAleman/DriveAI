import { SetStateAction, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import useStyles from './styles';

type HeaderAdminProps = {
  userNamee: string;
  bottomName_1: string;
  bottomName_2: string;
  // otras props aquí
}

const monthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date());

const HeaderAdmin = ({ userNamee,bottomName_1,bottomName_2 }: HeaderAdminProps) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('change');

  const handleTabClick = (tab: SetStateAction<string>) => {
    setSelectedTab(tab);
  };
const hour= new Date;
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.root2}>
      <div className={classes.section}>
        <Typography variant="caption" className={classes.hour}>{hour.getDate().toLocaleString()+ " de "+monthName+" del "+hour.getFullYear().toString()}</Typography>
      </div>
      <div className={classes.divider} />
      <div className={classes.section}>
        <Typography className={classes.sa}>SA</Typography>
      </div>
      <div className={classes.divider} />
      <div className={classes.section}>
        <Typography className={classes.userName}>{userNamee}</Typography>
      </div>
      <div className={classes.divider} />
      <div className={classes.section}>
        <IconButton className={classes.notification}>
          <NotificationsRoundedIcon />
        </IconButton>
      </div>
    </Toolbar>
      <div className={classes.divider}></div>
      <div className={`${classes.accountSection}`}>
        <div className={classes.breadcrumb}>
          <Typography variant="caption">
            <a href="#" className={classes.link}>Administración</a> {'>'} Cuenta
          </Typography>
        </div>
        <Typography className={classes.spaces} variant="h6">Administración de cuenta</Typography>
        <div className={`${classes.sectionDesktop} ${classes.spaces}`} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className={classes.root}>
            <Button
              className={`${classes.button} ${selectedTab === 'change' ? classes.selected : ''}`}
              onClick={() => handleTabClick('change')}
            >
              {bottomName_1}
            </Button>
            <Button
              className={`${classes.button} ${selectedTab === 'change2' ? classes.selected : ''}`}
              onClick={() => handleTabClick('change2')}
            >
              {bottomName_2}
            </Button>
          </div>
        </div>
      </div>
    </AppBar>
  );



}


export default HeaderAdmin;

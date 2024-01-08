import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TabPanelProps} from '../types'


const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
      
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

export default TabPanel
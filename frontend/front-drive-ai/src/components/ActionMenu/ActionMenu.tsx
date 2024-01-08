// src/components/ActionMenu/index.tsx
import React from 'react';
import {ActionMenuProps} from './types';
import {Button, Menu, MenuItem, ListItemIcon, Typography} from '@mui/material';

const ActionMenu: React.FC<ActionMenuProps> = ({
                                                   title,
                                                   icon,
                                                   items,
                                                   onItemClick,
                                                   fontWeight,
                                                   color,
                                                   mt,
                                                   mr, ml,
                                                   mb,
                                                   fontSize,
                                               }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (index: number) => {
        handleClose();
        onItemClick && onItemClick(index);
    };

    return (
        <div>
            <Button
                aria-controls="action-menu"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={icon}
                sx={{
                    textTransform: 'none',
                    fontWeight: fontWeight || 'inherit',
                    color: color || 'inherit',
                    mt: mt || 0,
                    mr: mr || 0,
                    ml: ml || 0,
                    mb: mb || 0,
                    fontSize: fontSize || 'inherit'
                }}
            >
                {title}
            </Button>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} onClick={() => handleItemClick(index)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <Typography variant="inherit">{item.text}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ActionMenu;

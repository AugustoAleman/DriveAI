import { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { CustomSelectProps } from './types';


export default function CustomSelect({ options, label, defaultValue = 'Estado', onChange }: CustomSelectProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box sx={{ minWidth: 1 }}>
      <FormControl size='medium'>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options && options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

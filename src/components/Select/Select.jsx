import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MUISelect } from '@mui/material';

const Select = ({ label, selectedId, items, handleChange }) => {

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MUISelect
        value={selectedId}
        label={label}
        onChange={({target})=> { handleChange(target.value);}}
      >
        {items.map((item) => 
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        )}
      </MUISelect>
    </FormControl>
  );
};

export default Select;

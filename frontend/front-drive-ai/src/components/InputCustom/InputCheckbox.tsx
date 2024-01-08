import React from 'react';
import { InputCheckboxProps } from './types';


const InputCheckbox: React.FC<InputCheckboxProps> = ({ label }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      {label}
    </label>
  );
};

export default InputCheckbox;

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";

type Checkbox = {
  id: string;
  checked: boolean;
  title: string;
};

interface CheckboxGroupProps {
  label: string;
  options: Record<string, Checkbox>;
}

const CheckboxGroup = ({ label, options }: CheckboxGroupProps) => {
  const handleCheckboxChange = (e) => {
    console.log(e);
  };
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <FormGroup row>
        {Object.values(options).map((checkbox) => {
          <FormControlLabel
            control={
              <Checkbox
                checked={checkbox.checked}
                onChange={handleCheckboxChange}
              />
            }
            label={checkbox.title}
          />;
        })}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;

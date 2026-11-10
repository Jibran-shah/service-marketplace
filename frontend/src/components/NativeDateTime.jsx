import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function NativeDateTime({ label, placeholder, name, value, onChange, slotProps, onBlur, onFocus, fullWidth }) {

  const [fieldType, setFieldType] = useState('text');
  return (
    <TextField
      label={label}
      type={fieldType}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={(e) => {
        onFocus?.(e);
        setFieldType('datetime-local')
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.target.value) {
          setFieldType('text');
        }
      }}
      slotProps={slotProps}
      fullWidth={fullWidth}
    />
  );
}

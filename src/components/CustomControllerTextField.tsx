import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface IControllerInterface {
  name: string;
  label: string | JSX.Element;
  placeholder?: string;
  type: string;
  disable?: boolean;
  isMultiline?: boolean;
  variant?: 'outlined' | 'filled' | 'standard' | undefined;
  multiline?: boolean;
  defaultValue?: string | number;
  shrink?: boolean;
  rows?: number | string;
}
const CustomController = (props: IControllerInterface) => {
  const {
    name,
    defaultValue,
    label,
    type,
    placeholder,
    isMultiline,
    multiline,
    variant,
    disable,
    shrink,
    rows,
    ...other
  } = props;
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error: { message } = {} } }) => (
          <TextField
            type={type === 'password' ? (showPassword ? 'text' : type) : type}
            variant={variant ? variant : 'outlined'}
            margin="normal"
            multiline={multiline}
            rows={rows}
            error={!!message}
            label={label}
            placeholder={placeholder || ''}
            fullWidth
            {...field}
            {...other}
            disabled={disable}
            helperText={message || ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {type === 'password' && (
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  )}
                </InputAdornment>
              )
            }}
            InputLabelProps={
              type === 'date' || !!shrink
                ? {
                    shrink: true
                  }
                : undefined
            }
            minRows={isMultiline ? 4 : 1}
          />
        )}
      />
    </Box>
  );
};

export default CustomController;

import { Box, Input, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface IControllerInterface {
  name: string;
  defaultValue?: string | number;
  sx?: {};
  id?: string;
  accept?: string;
}
const CustomImageController = (props: IControllerInterface) => {
  const { sx, id, name } = props;
  const { control } = useFormContext();

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error: { message } = {} } }) => (
          <>
            <Input
              type="file"
              style={sx}
              id={id}
              inputProps={{
                accept: 'image/*'
              }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.files)}
            />
            {!!message && (
              <Typography variant="caption" color="error">
                {message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CustomImageController;

import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

export default function SearchBar() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Autocomplete
        id="free-solo-demo"
        renderInput={(params) => <TextField {...params} label="search" />}
        options={[]}
        sx={{ width: 500 }}
      />
      <Button variant="contained" size="large">
        Search
      </Button>
    </Stack>
  );
}

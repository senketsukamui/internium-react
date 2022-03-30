import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";


const SearchInput = ({onChange, value, ...props}) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      {...props}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        onChange={onChange}
        value={value}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;

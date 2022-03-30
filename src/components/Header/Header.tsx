import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Internium
          </Typography>
          <Button color="inherit">Вход</Button>
          <Button onClick={() => navigate("/auth")} color="inherit">
            Регистрация
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

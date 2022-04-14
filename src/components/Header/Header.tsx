import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import ProfileHeader from "components/ProfileHeader";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { authStore } = useStores();
  console.log(authStore.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Internium
          </Typography>
          {!authStore.user && (
            <Button onClick={() => navigate("/auth")} color="inherit">
              Авторизация
            </Button>
          )}
          <ProfileHeader user={authStore.user} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default observer(Header);

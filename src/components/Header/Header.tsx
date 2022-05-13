import { Chat, SearchRounded } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import ProfileHeader from "components/ProfileHeader";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const { authStore } = useStores();
  const userObject = authStore.getUserObject;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Internium
          </Typography>
          {!userObject && (
            <Button onClick={() => navigate("/auth")} color="inherit">
              Авторизация
            </Button>
          )}
          <Chat
            onClick={() => navigate("/chat")}
            sx={{ marginRight: 1, cursor: "pointer" }}
          />
          <SearchRounded
            sx={{ marginRight: 1, cursor: "pointer" }}
            onClick={() => navigate("/search")}
          />
          {userObject && <ProfileHeader user={userObject} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default observer(Header);

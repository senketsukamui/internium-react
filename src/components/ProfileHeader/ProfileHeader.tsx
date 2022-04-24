import { Button, Menu, MenuItem } from "@mui/material";
import React, { FC } from "react";
import { RegisteredIntern } from "api/types";
import { useNavigate } from "react-router-dom";
import { useStores } from "hooks/useStores";
import { getHeaderName } from "./utils";

interface ProfileHeaderProps {
  user: RegisteredIntern;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { authStore } = useStores();
  const { user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authStore.logout();
    handleClose();
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
    handleClose();
  };

  return (
    <div>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {getHeaderName(authStore.getUserObject)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileHeader;

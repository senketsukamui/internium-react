import { Button, Menu, MenuItem } from "@mui/material";
import React, { FC } from "react";
import { RegisteredIntern } from "api/types";

interface ProfileHeaderProps {
  user: RegisteredIntern;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        Глеб Потапов
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
        <MenuItem onClick={handleClose}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileHeader;

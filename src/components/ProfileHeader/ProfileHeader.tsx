import { Button, Menu, MenuItem } from "@mui/material";
import React, { FC } from "react";
import { RegisteredIntern } from "api/types";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  user: RegisteredIntern;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { user, loading } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        Глеб Потапов
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
        <MenuItem onClick={handleClose}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileHeader;

import {
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import ProfileHeader from "components/ProfileHeader";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { HeaderLink } from "./HeaderLink";

const Header = () => {
  const navigate = useNavigate();

  const { authStore } = useStores();
  const userObject = authStore.getUserObject;

  return (
    <AppBar
      position="relative"
      color="inherit"
      sx={{
        backgroundColor: "#F9F9F9",
        boxShadow: "0px 3px 8px rgba(45, 45, 45, 0.05)",
      }}
    >
      <Container>
        <Toolbar
          sx={(theme) => ({
            alignItems: "center",
            height: theme.spacing(8),
            justifyContent: "space-between",
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          })}
        >
          <Grid
            item
            container
            wrap="nowrap"
            spacing={6}
            sx={{ height: "100%", alignItems: "center" }}
          >
            <Grid item sx={{marginTop: '8px'}}>
              <img src={logo} alt="internium logo" height="40" />
            </Grid>
            <Grid item container spacing={3}>
              <Grid item>
                <HeaderLink href="">Стажировки</HeaderLink>
              </Grid>
              <Grid item>
                <HeaderLink href="">Компании</HeaderLink>
              </Grid>
              <Grid item>
                <HeaderLink href="">Соискатели</HeaderLink>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={4}
            sx={{ width: "unset", flexWrap: "nowrap", alignItems: "center" }}
          >
            {/* Check if user is not an intern */}
            <Grid item whiteSpace="nowrap">
              <Button
                variant="contained"
                color="primary"
                href="/auth/company/login"
                sx={{
                  textTransform: "initial",
                  fontWeight: 600,
                }}
              >
                Создать вакансию
              </Button>
            </Grid>

            {!userObject && (
              <Grid item>
                <Link
                  href="/auth/intern"
                  color="inheirt"
                  variant="body2"
                  underline="none"
                  sx={{ fontWeight: 600 }}
                >
                  Вход
                </Link>
              </Grid>
            )}

            {/* <Grid item>
            <SearchRounded
              sx={{ marginRight: 1, cursor: "pointer" }}
              onClick={() => navigate("/search")}
            />
          </Grid> */}
            <Grid item>
              {userObject && <ProfileHeader user={userObject} />}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(Header);

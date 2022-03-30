import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

const Login: FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" noValidate sx={{ mt: 4 }}>
          <Grid container spacing={1}>
            <TextField
              name="phone"
              required
              fullWidth
              id="phone"
              label="Телефон"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoFocus
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

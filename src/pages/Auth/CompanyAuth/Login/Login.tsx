import { yupResolver } from "@hookform/resolvers/yup";
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
import { useStores } from "hooks/useStores";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "./constants";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: LoginFormValues) => {
    authStore.authorizeCompanyUser(values).finally(() => {
      navigate("/");
    });
  };
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
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          sx={{ mt: 4 }}
        >
          <Grid container spacing={1}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={Boolean(fieldState?.error)}
                  helperText={
                    fieldState?.error ? "Пожалуйста введите почту" : null
                  }
                  fullWidth
                  required
                  type="email"
                  label="Почта"
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={Boolean(fieldState?.error)}
                  helperText={
                    fieldState?.error ? "Пожалуйста введите пароль" : null
                  }
                  fullWidth
                  required
                  type="password"
                  label="Пароль"
                  sx={{ marginBottom: 1 }}
                />
              )}
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
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/auth/company/register" variant="body2">
                Ещё нет аккаунта? Зарегистрируйте его
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

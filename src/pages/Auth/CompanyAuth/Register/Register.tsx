import React, { FC } from "react";
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
import { registerSchema } from "./constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStores } from "hooks/useStores";
import { CompanyInfo } from "api/auth";

const Register: FC = () => {
  const { authStore } = useStores();
  const { control, handleSubmit, formState } = useForm<CompanyInfo>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      // password: "",
      tin: "",
    },
  });

  const handleRegister = (values: CompanyInfo) => {
    authStore.signupCompany(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error
                        ? "Пожалуйста введите названии компании"
                        : null
                    }
                    fullWidth
                    required
                    label="Название компании"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                    label="Почта"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error ? "Пожалуйста введите город" : null
                    }
                    fullWidth
                    required
                    type="city"
                    label="Город"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
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
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="tin"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error ? "Пожалуйста введите ИНН" : null
                    }
                    fullWidth
                    required
                    type="tin"
                    label="ИНН"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/auth/company/login" variant="body2">
                Уже есть аккаунт? Перейдите на страницу авторизации
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

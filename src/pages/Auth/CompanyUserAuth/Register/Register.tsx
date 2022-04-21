import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./constants";
import { useStores } from "hooks/useStores";
import { format } from "date-fns";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useNotification from "hooks/useNotification";

interface SignupFormValues {
  phone: string;
  birthdate: Date;
  firstName: string;
  lastName: string;
  password: string;
  middleName: string;
  position: string;
}

const Register: FC = () => {
  const { authStore } = useStores();
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("access_token");

  const [message, sendMessage] = useNotification();

  React.useEffect(() => {
    authStore.verifyCompanyInvitation({ token }).then(() => {
      sendMessage({ msg: "Token successfully verified", variant: "success" });
    });
  }, []);

  const { control, handleSubmit, formState } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      phone: "",
      lastName: "",
      password: "",
      position: "",
      birthdate: new Date(Date.now()),
    },
  });

  const onSignUpSubmit = (values: SignupFormValues) => {
    authStore
      .createCompanyUser(
        {
          ...values,
          birthdate: format(
            new Date(values.birthdate.toISOString()),
            "yyyy-MM-dd"
          ),
        },
        token
      )
      .then(() => {
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
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={1}>
            <form noValidate onSubmit={handleSubmit(onSignUpSubmit)}>
              <Typography
                gutterBottom
                component="h1"
                align="center"
                variant="h5"
              >
                Введите ваши данные
              </Typography>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error ? "Пожалуйста введите имя" : null
                    }
                    fullWidth
                    required
                    label="Имя"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error ? "Пожалуйста введите фамилию" : null
                    }
                    fullWidth
                    required
                    label="Фамилия"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
              <Controller
                name="middleName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Отчество"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Пароль"
                    sx={{ marginBottom: 1 }}
                    required
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error ? "Пожалуйста введите телефон" : null
                    }
                    fullWidth
                    label="Телефон"
                    required
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
              <Controller
                name="position"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error
                        ? "Пожалуйста введите вашу позицию"
                        : null
                    }
                    fullWidth
                    label="Позиция"
                    required
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        label="Дата рождения*"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{ marginBottom: 1 }}
                          />
                        )}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
              <Button fullWidth variant="contained" type="submit">
                Завершить регистрацию
              </Button>
            </form>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import { useStores } from "hooks/useStores";
import { useTimer } from "react-timer-hook";
import { observer } from "mobx-react";
import { AuthorizationStatuses } from "./constants";
import { Controller, useForm } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const getTimerDate = (value: number) => new Date(Date.now() + value * 1000);

interface SignupFormValues {
  email: string;
  birthdate: Date;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: boolean;
}

const Login: FC = () => {
  const { authStore } = useStores();
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [status, setStatus] = useState<AuthorizationStatuses>(
    AuthorizationStatuses.INFO
  );
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    authStore.loginIntern(phone).then(() => {
      setStatus(AuthorizationStatuses.OTP);
    });
  };

  const handleCodeComplete = (value: string) => {
    if (Number(value)) {
      authStore.verifyIntern(phone, value).then(() => {
        setStatus(AuthorizationStatuses.INFO);
      });
    }
  };
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: getTimerDate(60),
  });

  const { control, handleSubmit } = useForm<SignupFormValues>();

  useEffect(() => {
    restart(getTimerDate(authStore.blockTimer), true);
  }, [authStore.blockTimer]);

  const renderCurrentStep = (step: AuthorizationStatuses) => {
    switch (step) {
      case AuthorizationStatuses.PHONE:
        return (
          <form noValidate onSubmit={handleOTPSubmit}>
            <Typography component="h1" sx={{ margin: "0 auto" }} variant="h5">
              Введите номер телефона
            </Typography>
            <Typography paragraph align="center" sx={{ opacity: 0.5 }}>
              Нужен для регистрации студента и дальнейшего входа в систему
            </Typography>
            <Input
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isRunning}
              sx={{ mt: 3, mb: 2 }}
            >
              Получить код
            </Button>
          </form>
        );
      case AuthorizationStatuses.OTP:
        return (
          <>
            <ReactInputVerificationCode
              autoFocus
              length={6}
              value={code}
              onChange={(value: string) => setCode(value)}
              onCompleted={handleCodeComplete}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isRunning}
              sx={{ mt: 3, mb: 2 }}
            >
              Получить код
            </Button>
            {isRunning && authStore.codeSent && (
              <Typography>{`Код отправлен. Получить повторный код через ${seconds} секунд.`}</Typography>
            )}
          </>
        );
      case AuthorizationStatuses.INFO:
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Typography gutterBottom component="h1" align="center" variant="h5">
              Введите ваши данные
            </Typography>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Имя"
                  {...field}
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Фамилия"
                  {...field}
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
                  fullWidth
                  label="Отчество"
                  {...field}
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Почта"
                  {...field}
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="birthdate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Дата рождения"
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        sx={{ marginBottom: 1 }}
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <Button fullWidth variant="contained" type="submit">
              Завершить регистрацию
            </Button>
          </form>
        );
      default:
    }
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
            {renderCurrentStep(status)}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default observer(Login);

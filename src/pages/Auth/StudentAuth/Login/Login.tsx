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
import { AuthorizationStatuses, signupSchema } from "./constants";
import { Controller, useForm } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { InternVerify } from "api/types";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [status, setStatus] = useState<AuthorizationStatuses>(
    AuthorizationStatuses.PHONE
  );
  const handleOTPSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    authStore.loginIntern(phone).then(() => {
      setStatus(AuthorizationStatuses.OTP);
    });
  };

  const {
    seconds,
    isRunning,
    restart,
    pause: pauseTimer,
  } = useTimer({
    expiryTimestamp: getTimerDate(60),
  });

  const handleCodeComplete = (value: string) => {
    if (Number(value)) {
      authStore.verifyIntern(phone, value).then((isCreatedUser: boolean) => {
        if (isCreatedUser) {
          navigate("/");
        } else {
          setStatus(AuthorizationStatuses.INFO);
        }
      });
    }
  };

  const { control, handleSubmit } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: true,
      birthdate: new Date(Date.now()),
    },
  });

  const onSignUpSubmit = (values: SignupFormValues) => {
    authStore
      .signupIntern({
        ...values,
        birthdate: format(
          new Date(values.birthdate.toISOString()),
          "yyyy-MM-dd"
        ),
      })
      .finally(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    restart(getTimerDate(authStore.blockTimer), true);
  }, [authStore.blockTimer]);

  const renderCurrentStep = (step: AuthorizationStatuses) => {
    switch (step) {
      case AuthorizationStatuses.PHONE:
        return (
          <form noValidate onSubmit={handleOTPSubmit}>
            <Typography
              component="h1"
              sx={{ display: "flex", justifyContent: "center" }}
              variant="h5"
            >
              ?????????????? ?????????? ????????????????
            </Typography>
            <Typography paragraph align="center" sx={{ opacity: 0.5 }}>
              ?????????? ?????? ?????????????????????? ???????????????? ?? ?????????????????????? ?????????? ?? ??????????????
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
              ???????????????? ??????
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
              ???????????????? ??????
            </Button>
            {isRunning && authStore.codeSent && (
              <Typography>{`?????? ??????????????????. ???????????????? ?????????????????? ?????? ?????????? ${seconds} ????????????.`}</Typography>
            )}
          </>
        );
      case AuthorizationStatuses.INFO:
        return (
          <form noValidate onSubmit={handleSubmit(onSignUpSubmit)}>
            <Typography gutterBottom component="h1" align="center" variant="h5">
              ?????????????? ???????? ????????????
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
                    fieldState?.error ? "???????????????????? ?????????????? ??????" : null
                  }
                  fullWidth
                  required
                  label="??????"
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
                    fieldState?.error ? "???????????????????? ?????????????? ??????????????" : null
                  }
                  fullWidth
                  required
                  label="??????????????"
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
                  label="????????????????"
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={Boolean(fieldState?.error)}
                  helperText={
                    fieldState?.error ? "???????????????????? ?????????????? ??????????" : null
                  }
                  fullWidth
                  label="??????????"
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
                      label="???????? ????????????????*"
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
              ?????????????????? ??????????????????????
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

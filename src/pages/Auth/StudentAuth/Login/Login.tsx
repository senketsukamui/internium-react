import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import { useStores } from "hooks/useStores";
import { useTimer } from "react-timer-hook";
import { observer } from "mobx-react";
import { isNumber } from "lodash";

const Login: FC = () => {
  const { authStore } = useStores();
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const handleSubmit = (e) => {
    e.preventDefault();
    authStore.loginIntern(phone);
  };

  const handleCodeComplete = (value: string) => {
    if (Number(value)) {
      authStore.verifyIntern(phone, value);
    }
  };
  const { seconds, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: new Date(1),
  });

  useEffect(() => {
    restart(new Date(Date.now() + authStore.blockTimer * 1000), true);
  }, [authStore.blockTimer]);

  console.log(authStore.blockTimer);

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
          Введите номер телефона
        </Typography>
        <Typography paragraph align="center" sx={{ opacity: 0.5 }}>
          Нужен для регистрации студента и дальнейшего входа в систему
        </Typography>
        <Box component="form" noValidate sx={{ mt: 4 }} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {authStore.codeSent ? (
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
            ) : (
              <>
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
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default observer(Login);

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import React, { FC, useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import useCountdown from "hooks/useCountdown";
import { useStores } from "hooks/useStores";

const Login: FC = () => {
  const { authStore } = useStores();
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const countdown = useCountdown(1000, 60 * 1000);
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    authStore.loginIntern(phone);
  };
  const codeSent = false;
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
        <Box
          component="form"
          noValidate
          sx={{ mt: 4, width: "100%" }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={1}>
            {codeSent ? (
              <ReactInputVerificationCode
                autoFocus
                length={6}
                value={code}
                onChange={(value: string) => setCode(value)}
              />
            ) : (
              <MuiPhoneNumber
                onlyCountries={["ru"]}
                defaultCountry={"ru"}
                fullWidth
                value={phone}
                onChange={(value) => setPhone(value)}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Получить код
          </Button>
          <Typography>{`Код отправлен. Получить повторный код через ${countdown} секунд.`}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

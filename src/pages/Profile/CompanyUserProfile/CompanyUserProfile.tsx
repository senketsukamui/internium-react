import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SvgCompany from "components/Icons/CompanyIcon";
import VacancyModal from "components/VacancyModal";
import useNotification from "hooks/useNotification";
import { useStores } from "hooks/useStores";
import React from "react";

const CompanyUserProfile = () => {
  const { authStore } = useStores();
  const [message, sendMessage] = useNotification();
  const [employeeEmail, setEmployeeEmail] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleEmailSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    authStore
      .createCompanyInvitation(employeeEmail)
      .catch(() => sendMessage({ msg: "Error", variant: "error" }));
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container>
              <Stack direction="column" spacing={2}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "15px",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <SvgCompany width={150} height={150} />
                  </Box>
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Quantori
                  </Typography>
                  <Typography align="center" component="p" gutterBottom>
                    Frontend-разработчик
                  </Typography>
                  <Link
                    component="p"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    website.com
                  </Link>
                </Paper>
                <Paper elevation={3} sx={{ padding: "15px" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleModalOpen}
                  >
                    Создать новую стажировку
                  </Button>
                </Paper>
              </Stack>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Stack direction="column" spacing={2}>
              <Paper elevation={3}>
                <Card sx={{ position: "relative" }}>
                  <CardHeader title="Обо мне" />
                  <CardContent>
                    Занимаюсь разработкой веб-приложений на React и Redux уже 3
                    года, из которых 1.5 года в коммерческой разработке. Имею
                    опыт разработки приложений различных видов, интеграции
                    различных сервисов, оценки и анализа задач бизнеса.
                    Программированием занимаюсь уже больше 4 лет. Помимо
                    JavaScript имею опыт с Python.
                  </CardContent>
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: 0,
                    }}
                  >
                    <Link underline="hover" variant="h5">
                      Изменить
                    </Link>
                  </CardActions>
                </Card>
              </Paper>
              <Paper elevation={3}>
                <Card sx={{ position: "relative" }}>
                  <CardHeader title="GitHub" />
                  <CardContent>
                    * здесь должна быть ссылка на github *
                  </CardContent>
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: 0,
                    }}
                  >
                    <Link underline="hover" variant="h5">
                      Изменить
                    </Link>
                  </CardActions>
                </Card>
              </Paper>
              <Paper elevation={3}>
                <Card sx={{ position: "relative" }}>
                  <CardHeader title="Образование" />
                  <CardContent>Информация об образовании</CardContent>
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: 0,
                    }}
                  >
                    <Link underline="hover" variant="h5">
                      Изменить
                    </Link>
                  </CardActions>
                </Card>
              </Paper>
              <Paper elevation={3}>
                <Card sx={{ position: "relative" }}>
                  <CardHeader title="Курсы" />
                  <CardContent>Информация о пройдённых курсах</CardContent>
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: 0,
                    }}
                  >
                    <Link underline="hover" variant="h5">
                      Изменить
                    </Link>
                  </CardActions>
                </Card>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {modalOpen && <VacancyModal open={modalOpen} setOpen={setModalOpen} />}
    </Container>
  );
};

export default CompanyUserProfile;

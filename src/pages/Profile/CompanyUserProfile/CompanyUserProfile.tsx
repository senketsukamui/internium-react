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
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";

const CompanyUserProfile = () => {
  const { id } = useParams();
  const { authStore, companyUsersStore } = useStores();
  const [message, sendMessage] = useNotification();
  const [employeeEmail, setEmployeeEmail] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const profile = companyUsersStore.getProfile;

  console.log(profile);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  React.useEffect(() => {
    companyUsersStore.getCompanyUserProfile(id);
  }, [id]);

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
                    {`${profile?.userInfo?.firstName} ${profile?.userInfo?.lastName}`}
                  </Typography>
                  <Typography align="center" component="p" gutterBottom>
                    {profile?.userInfo?.position}
                  </Typography>
                  <Typography align="center" component="p" gutterBottom>
                    {profile?.userInfo?.phone}
                  </Typography>
                </Paper>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "15px",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <SvgCompany width={150} height={150} />
                  </Box>
                  <Link
                    variant="h5"
                    gutterBottom
                    href={`/company/profile/${profile?.company?.id}`}
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {profile?.company?.name}
                  </Link>
                  <Typography align="center" component="p" gutterBottom>
                    {profile?.company?.city}
                  </Typography>
                  <Link align="center" component="p" gutterBottom>
                    {profile?.userInfo?.website}
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

export default observer(CompanyUserProfile);

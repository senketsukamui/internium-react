import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SvgCompany from "components/Icons/CompanyIcon";
import useNotification from "hooks/useNotification";
import { useStores } from "hooks/useStores";
import React from "react";
import { useParams } from "react-router-dom";
import { Ability } from "store/specializations/types";

const CompanyProfile = () => {
  const { id } = useParams();
  const { authStore, companiesStore } = useStores();
  const [message, sendMessage] = useNotification();
  const [employeeEmail, setEmployeeEmail] = React.useState<string>("");

  const companyVacancies = companiesStore.companyVacancies;

  const handleEmailSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    authStore
      .createCompanyInvitation(employeeEmail)
      .catch(() => sendMessage({ msg: "Error", variant: "error" }));
  };

  React.useEffect(() => {
    companiesStore.getCompanyVacancies(id);
  }, [id]);

  React.useEffect(() => {
    companiesStore.getCompanyProfile(id);
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
                <Paper
                  sx={{
                    padding: "15px",
                  }}
                  elevation={3}
                >
                  <Typography
                    align="center"
                    sx={{ fontWeight: "bold" }}
                    paragraph
                    gutterBottom
                  >
                    Пригласить сотрудника
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onSubmit={handleEmailSend}
                  >
                    <TextField
                      size="small"
                      sx={{
                        marginRight: "5px",
                      }}
                      value={employeeEmail}
                      onChange={(e) => {
                        setEmployeeEmail(e.target.value);
                      }}
                    />
                    <Button size="small" type="submit" variant="outlined">
                      Отправить
                    </Button>
                  </Box>
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
                {companyVacancies?.map((vacancy) => (
                  <Card key={vacancy.id}>
                    <CardContent>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {vacancy.title}
                      </Typography>
                      {vacancy.salary && (
                        <Typography
                          paragraph
                        >{`${vacancy.salary} рублей`}</Typography>
                      )}
                      <Typography paragraph>{vacancy.description}</Typography>
                      {vacancy?.abilities.map((ability: Ability) => (
                        <Chip key={ability.id} label={ability.title} />
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CompanyProfile;

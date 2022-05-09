import { CheckCircle } from "@mui/icons-material";
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
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SvgCompany from "components/Icons/CompanyIcon";
import VacancyCard from "components/VacancyCard";
import useNotification from "hooks/useNotification";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ability } from "store/specializations/types";
import { VacancyModel } from "store/vacancies/types";

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authStore, companiesStore } = useStores();
  const [message, sendMessage] = useNotification();
  const [employeeEmail, setEmployeeEmail] = React.useState<string>("");

  const companyVacancies = companiesStore.companyVacancies;

  const profile = companiesStore.companyProfile;

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
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {profile?.name}{" "}
                    {profile?.verified && (
                      <CheckCircle color="success" sx={{ marginLeft: 1 }} />
                    )}
                  </Typography>
                  <Typography gutterBottom align="center">
                    {profile?.city}
                  </Typography>

                  <Link
                    component="p"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {profile?.website}
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/company/profile/${id}/edit`)}
                    sx={{
                      marginTop: 1,
                    }}
                    fullWidth
                  >
                    Редактировать
                  </Button>
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
                  <CardHeader title="Описание" />
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: profile?.description }}
                    />
                  </CardContent>
                </Card>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  padding: "10px",
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5">Вакансии компании</Typography>
                  {companyVacancies?.map((vacancy: VacancyModel) => (
                    <VacancyCard item={vacancy} key={vacancy.id} />
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default observer(CompanyProfile);

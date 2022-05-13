import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import SvgCompany from "components/Icons/CompanyIcon";
import useNotification from "hooks/useNotification";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Vacancy = () => {
  const { id } = useParams();
  const { vacanciesStore, companiesStore, reactionsStore } = useStores();
  const [message, sendMessage] = useNotification();
  const navigate = useNavigate();

  const vacancy = vacanciesStore.getVacancyValue;
  const companyVacancies = companiesStore.companyVacancies;

  const handleReact = () => {
    reactionsStore.createReaction(Number(id)).then(() =>
      sendMessage({
        msg: "Вы успешно откликнулись на вакансию!",
        variant: "success",
      })
    );
  };

  const handleDeleteReaction = () => {
    reactionsStore.deleteReaction(Number(id)).then(() =>
      sendMessage({
        msg: "Вы успешно удалили отклик на вакансию!",
        variant: "danger",
      })
    );
  };

  React.useEffect(() => {
    vacanciesStore.getVacancy(id);
  }, [id]);

  React.useEffect(() => {
    if (vacancy) {
      companiesStore.getCompanyVacancies(vacancy.company.id);
    }
  }, [vacancy]);

  return (
    <Grid
      sx={{
        padding: "30px 180px",
      }}
      container
      spacing={2}
    >
      {vacancy && (
        <>
          <Grid item xs={8}>
            <Paper
              sx={{
                padding: "30px",
                marginBottom: 2,
              }}
              elevation={2}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}
                gutterBottom
              >
                {vacancy.title}
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
                  fontSize: "1.2rem",
                }}
              >
                Зарплата
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                }}
                gutterBottom
              >
                {`${vacancy.salary} рублей`}
              </Typography>
              <Typography
                sx={{
                  opacity: 0.8,
                  fontSize: "1.2rem",
                }}
                gutterBottom
              >
                Навыки
              </Typography>
              <Box>
                {Boolean(vacancy?.abilities.length) ? (
                  vacancy?.abilities.map((item) => (
                    <Chip sx={{ marginRight: 1 }} label={item.title} />
                  ))
                ) : (
                  <Typography paragraph>Не указаны</Typography>
                )}
              </Box>
            </Paper>
            <Paper
              sx={{
                padding: "30px",
              }}
              elevation={2}
            >
              <Typography variant="h5">Описание</Typography>
              <Divider
                sx={{
                  margin: "8px 0",
                }}
                variant="fullWidth"
              />
              <div dangerouslySetInnerHTML={{ __html: vacancy.description }} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "30px",
                marginBottom: 1,
              }}
              elevation={2}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SvgCompany width={160} height={160} />
              </Box>
              <Link
                href={`/company/profile/${vacancy.company.id}`}
                variant="h5"
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {vacancy.company.name}
              </Link>
              <Button
                variant="contained"
                onClick={() => navigate(`/vacancy/${id}/edit`)}
                fullWidth
              >
                Редактировать
              </Button>
              <Button
                variant="contained"
                onClick={handleReact}
                fullWidth
                sx={{ marginTop: 1 }}
              >
                Откликнуться
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteReaction}
                fullWidth
                sx={{ marginTop: 1 }}
              >
                Убрать отклик
              </Button>
            </Paper>
            <Paper>
              <Accordion>
                <AccordionSummary>{`Все вакансии компании (${
                  companyVacancies?.length - 1
                })`}</AccordionSummary>
                <AccordionDetails>
                  <List>
                    {companyVacancies
                      ?.filter((vacancy) => vacancy?.id !== id)
                      ?.map((vacancy) => (
                        <ListItemButton
                          onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                          divider
                        >
                          {vacancy.title}
                        </ListItemButton>
                      ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default observer(Vacancy);

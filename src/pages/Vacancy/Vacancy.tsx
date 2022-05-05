import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import SvgCompany from "components/Icons/CompanyIcon";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Vacancy = () => {
  const { id } = useParams();
  const { vacanciesStore } = useStores();
  const navigate = useNavigate();

  const vacancy = vacanciesStore.getVacancyValue;

  React.useEffect(() => {
    vacanciesStore.getVacancy(id);
  }, []);

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
                {vacancy?.abilities.map((item) => (
                  <Chip label={item.title} />
                ))}
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
                  margin: "5px 0",
                }}
                variant="fullWidth"
              />
              <Typography paragraph>{vacancy.description}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "30px",
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
              <Typography
                gutterBottom
                align="center"
                variant="h5"
                sx={{ marginTop: 1 }}
              >
                {vacancy.company.name}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(`/vacancy/${id}/edit`)}
                fullWidth
              >
                Редактировать
              </Button>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default observer(Vacancy);

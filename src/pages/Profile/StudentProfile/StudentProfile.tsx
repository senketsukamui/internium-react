import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SvgStudent from "components/Icons/StudentIcon";
import React, { FC } from "react";

const StudentProfile: FC = () => {
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
                    <SvgStudent width={150} height={150} />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Глеб Потапов
                  </Typography>
                  <Typography component="p" gutterBottom>
                    Frontend-разработчик
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    В поисках стажировки
                  </Typography>
                </Paper>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <List dense>
                    <ListItem>
                      <ListItemText>Возраст: 21 год</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Курс: 4</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Регистрация: 20.20.20</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Навыки: JavaScript Python ML</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Telegram @user</ListItemText>
                    </ListItem>
                  </List>
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
    </Container>
  );
};

export default StudentProfile;

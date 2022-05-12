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
import { differenceInYears, format } from "date-fns";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { calculateAge } from "utils";

const StudentProfile: FC = () => {
  const { id } = useParams();
  const { internsStore, authStore } = useStores();
  const isCurrentUser = authStore.isCurrentUser(id);
  const profile = isCurrentUser
    ? authStore.getUserObject
    : internsStore.getProfile;

  React.useEffect(() => {
    if (authStore.getUserObject && !isCurrentUser) {
      internsStore.getInternProfile(id);
    }
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
                    <SvgStudent width={150} height={150} />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {`${profile?.firstName} ${profile?.lastName}`}
                  </Typography>
                  <Typography component="p" gutterBottom>
                    {profile?.location}
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      color: `${
                        profile?.status === "ACTIVE" ? "green" : "red"
                      }`,
                      fontWeight: "bold",
                    }}
                  >
                    {profile?.status === "ACTIVE"
                      ? "Ищу стажировку"
                      : "Не ищу стажировку"}
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
                      <ListItemText>{`Возраст: ${calculateAge(
                        profile?.birthdate
                      )}`}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{`Почта: ${profile?.email}`}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{`Регистрация: ${
                        profile?.createdAt &&
                        format(new Date(profile?.createdAt), "dd.mm.yy")
                      }`}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{`Последнее обновление: ${
                        profile?.createdAt &&
                        format(new Date(profile?.updatedAt), "dd.mm.yy")
                      }`}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{`Навыки: ${profile?.abilities
                        ?.map((item) => item.title)
                        .join("*")}`}</ListItemText>
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
                    {profile?.description || "Нет информации"}
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
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default observer(StudentProfile);

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
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import SvgStudent from "components/Icons/StudentIcon";
import { differenceInYears, format } from "date-fns";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InternStatuses } from "store/auth/types";
import { calculateAge } from "utils";

const StudentProfile: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<InternStatuses>(
    InternStatuses.INACTIVE
  );
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

  React.useEffect(() => {
    if (profile) {
      setStatus(profile.status);
    }
  }, [profile]);

  const handleSwitchChange = () => {
    if (status === InternStatuses.INACTIVE) {
      setStatus(InternStatuses.ACTIVE);
      handleStatusChange(InternStatuses.ACTIVE);
    } else {
      setStatus(InternStatuses.INACTIVE);
      handleStatusChange(InternStatuses.INACTIVE);
    }
  };

  const handleStatusChange = (status: InternStatuses) => {
    internsStore.updateInternProfile(
      {
        location: profile.location,
        description: profile.description,
        birthdate: profile.birthdate,
        gender: profile.gender,
        firstName: profile.firstName,
        lastName: profile.lastName,
        middleName: profile.middleName,
        status,
      },
      profile.id
    );
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

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ color: "red" }}>
                      Не ищу стажировку
                    </Typography>
                    <Switch
                      onChange={handleSwitchChange}
                      checked={status === InternStatuses.ACTIVE}
                    />
                    <Typography sx={{ color: "green" }}>
                      В поисках стажировки
                    </Typography>
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/intern/profile/${id}/edit`)}
                    sx={{
                      marginTop: 1,
                    }}
                    fullWidth
                  >
                    Редактировать
                  </Button>
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

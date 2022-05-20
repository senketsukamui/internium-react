import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SvgStudent from "components/Icons/StudentIcon";
import InvitationCard from "components/InvitationCard";
import ReactionCard from "components/ReactionCard";
import VacancyCard from "components/VacancyCard";
import VacancyInvitationModal from "components/VacancyInvitationModal";
import { format } from "date-fns";
import { useStores } from "hooks/useStores";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { RegisterTypes } from "pages/Auth/constants";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InternStatuses } from "store/auth/types";
import { calculateAge } from "utils";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const StudentProfile: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<InternStatuses>(
    InternStatuses.INACTIVE
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { internsStore, authStore } = useStores();
  const isCurrentUser = authStore.isCurrentUser(id);
  const profile = isCurrentUser
    ? authStore.getUserObject
    : internsStore.getProfile;

  const reactions = internsStore.getReactions;
  const invitations = internsStore.getInvitations;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (
      !isCurrentUser &&
      authStore.userType &&
      authStore.userType !== RegisterTypes.INTERN
    ) {
      internsStore.getInternProfile(id);
    }
  }, [isCurrentUser, id]);

  React.useEffect(() => {
    if (isCurrentUser && authStore.userType === RegisterTypes.INTERN) {
      internsStore.getCurrentInternReactions();
      internsStore.getCurrentInternInvitations();
    }
  }, [isCurrentUser]);

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
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Container>
              <Stack direction="column" spacing={2}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "15px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {profile?.avatar ? (
                      <Box
                        component="img"
                        sx={{ width: 150, height: 150, borderRadius: "50%" }}
                        src={
                          typeof profile.avatar === "string"
                            ? `https://internium.monkeyhackers.org/${profile.avatar}`
                            : URL.createObjectURL(profile.avatar as Blob)
                        }
                      />
                    ) : (
                      <SvgStudent width={150} height={150} />
                    )}
                  </Box>

                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {`${profile?.firstName} ${profile?.lastName}`}
                  </Typography>
                  <Typography align="center" component="p" gutterBottom>
                    {profile?.location}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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
                  {authStore.userType !== RegisterTypes.INTERN && (
                    <Button
                      variant="contained"
                      onClick={() => setModalOpen(true)}
                      sx={{
                        marginTop: 1,
                      }}
                      fullWidth
                    >
                      Пригласить
                    </Button>
                  )}
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
                        format(new Date(profile?.createdAt), "dd.MM.yy")
                      }`}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{`Последнее обновление: ${
                        profile?.createdAt &&
                        format(new Date(profile?.updatedAt), "dd.MM.yy")
                      }`}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{`Навыки: ${
                        Boolean(profile?.abilities?.length)
                          ? profile?.abilities
                              ?.map((item) => item.title)
                              .join("•")
                          : "не указаны"
                      }`}</ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              </Stack>
            </Container>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Информация" />
                <Tab label="Приглашения" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Stack direction="column" spacing={2}>
                  <Paper elevation={3}>
                    <Card sx={{ position: "relative" }}>
                      <CardHeader title="Обо мне" />
                      <CardContent>
                        {profile?.description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: profile?.description,
                            }}
                          />
                        ) : (
                          "Нет информации"
                        )}
                      </CardContent>
                    </Card>
                  </Paper>
                  {!isEmpty(reactions) && (
                    <Paper
                      elevation={3}
                      sx={{
                        padding: "10px",
                      }}
                    >
                      <Stack spacing={2}>
                        <Typography variant="h5">Мои отклики</Typography>
                        {reactions?.map((reaction: any) => (
                          <ReactionCard item={reaction} key={reaction.id} />
                        ))}
                      </Stack>
                    </Paper>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {!isEmpty(invitations) && (
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <Stack spacing={2}>
                      <Typography variant="h5">Мои отклики</Typography>
                      {invitations?.map((reaction: any) => (
                        <InvitationCard item={reaction} key={reaction.id} />
                      ))}
                    </Stack>
                  </Paper>
                )}
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {modalOpen && (
        <VacancyInvitationModal
          internId={Number(id)}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      )}
    </Container>
  );
};

export default observer(StudentProfile);

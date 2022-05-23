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
  ListItem,
  ListItemButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { baseURL } from "api/utils";
import AnnouncementModal from "components/AnnouncementModal";
import SvgCompany from "components/Icons/CompanyIcon";
import ReactionCard from "components/ReactionCard";
import TabPanel from "components/TabPanel";
import UserReactionCard from "components/UserReactionCard";
import useNotification from "hooks/useNotification";
import { useStores } from "hooks/useStores";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { RegisterTypes } from "pages/Auth/constants";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Invitations from "./Invitations";
import Reactions from "./Reactions";

const Vacancy = () => {
  const { id } = useParams();
  const { vacanciesStore, companiesStore, reactionsStore, authStore } =
    useStores();

  const [message, sendMessage] = useNotification();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<number>(0);
  const navigate = useNavigate();

  const vacancy = vacanciesStore.getVacancyValue;
  const companyVacancies = companiesStore.companyVacancies;
  const invitations = vacanciesStore.getInvitations;
  const reactions = vacanciesStore.getReactions;
  const isIntern = authStore.isIntern;
  const isBelongToCurrentCompany = vacanciesStore.isBelongToCurrentCompany(
    vacancy?.companyId
  );

  console.log(authStore.getUserObject);

  const handleReact = () => {
    reactionsStore.createReaction(Number(id)).then(() =>
      sendMessage({
        msg: "Вы успешно откликнулись на вакансию!",
        variant: "success",
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

  React.useEffect(() => {
    if (
      authStore.userType !== RegisterTypes.INTERN &&
      isBelongToCurrentCompany
    ) {
      vacanciesStore.getVacancyInvitations(id);
      vacanciesStore.getVacancyReactions(id);
    }
  }, []);

  // const handleRevokeInvitation = (invitationId: number) => {
  //   invitationsStore.revokeVacancyInvitation(invitationId);
  // };

  const handleOpenAnnouncementModal = () => {
    setModalOpen(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

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
                    <Chip
                      key={item.id}
                      sx={{ marginRight: 1 }}
                      label={item.title}
                    />
                  ))
                ) : (
                  <Typography paragraph>Не указаны</Typography>
                )}
              </Box>
            </Paper>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tab} onChange={handleChange}>
                <Tab label="Информация" />
                {isBelongToCurrentCompany && <Tab label="Реакции" />}
                {isBelongToCurrentCompany && <Tab label="Приглашения" />}
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <Paper elevation={2}>
                <Typography variant="h5">Описание</Typography>
                <Divider
                  sx={{
                    margin: "8px 0",
                  }}
                  variant="fullWidth"
                />
                <div
                  dangerouslySetInnerHTML={{ __html: vacancy.description }}
                />
              </Paper>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              {reactions && <Reactions reactions={reactions} />}
            </TabPanel>
            <TabPanel value={tab} index={2}>
              {invitations && <Invitations invitations={invitations} />}
            </TabPanel>
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "30px",
                marginBottom: 1,
              }}
              elevation={2}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {vacancy?.company?.logo ? (
                  <Box
                    component="img"
                    sx={{ width: 160, height: 160, borderRadius: "50%" }}
                    src={
                      typeof vacancy?.company?.logo === "string"
                        ? `${baseURL}/${vacancy?.company.logo}`
                        : URL.createObjectURL(vacancy?.company.logo as Blob)
                    }
                  />
                ) : (
                  <SvgCompany width={160} height={160} />
                )}
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
              {!isIntern && isBelongToCurrentCompany && (
                <>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/vacancy/${id}/edit`)}
                    fullWidth
                  >
                    Редактировать
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ marginTop: 1 }}
                    onClick={handleOpenAnnouncementModal}
                    fullWidth
                  >
                    Отправить всем
                  </Button>
                </>
              )}
              {isIntern &&
                (vacancy.reacted ? (
                  <Typography sx={{ marginTop: 1, color: "#68c07b" }}>
                    Вы уже откликнулись на эту вакансию
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleReact}
                    fullWidth
                    sx={{ marginTop: 1 }}
                  >
                    Откликнуться
                  </Button>
                ))}
            </Paper>
            {!isEmpty(companyVacancies) && (
              <Paper>
                <Accordion>
                  <AccordionSummary>{`Другие вакансии компании (${
                    companyVacancies?.length - 1
                  })`}</AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {companyVacancies
                        ?.filter((vacancy) => vacancy?.id !== Number(id))
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
            )}
          </Grid>
        </>
      )}
      {modalOpen && (
        <AnnouncementModal
          open={modalOpen}
          setOpen={setModalOpen}
          vacancyId={Number(id)}
        />
      )}
    </Grid>
  );
};

export default observer(Vacancy);

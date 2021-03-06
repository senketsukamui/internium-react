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
import { baseURL } from "api/utils";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CompanyUserProfile = () => {
  const { id } = useParams();
  const { authStore, companyUsersStore } = useStores();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const isCurrentUser = authStore.isCurrentUser(id);
  const profile = isCurrentUser
    ? authStore.getUserObject
    : companyUsersStore.getProfile;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  React.useEffect(() => {
    if (authStore.getUserObject && !isCurrentUser) {
      companyUsersStore.getCompanyUserProfile(id);
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {profile?.userInfo?.avatar ? (
                      <Box
                        component="img"
                        sx={{ width: 150, height: 150, borderRadius: "50%" }}
                        src={
                          typeof profile?.userInfo?.avatar === "string"
                            ? `${baseURL}/${profile?.userInfo?.avatar}`
                            : URL.createObjectURL(
                                profile?.userInfo?.avatar as Blob
                              )
                        }
                      />
                    ) : (
                      <SvgCompany width={150} height={150} />
                    )}
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
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/company-user/profile/${id}/edit`)}
                    sx={{
                      marginTop: 1,
                    }}
                    fullWidth
                  >
                    ??????????????????????????
                  </Button>
                </Paper>
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
                    {profile?.company?.logo ? (
                      <Box
                        component="img"
                        sx={{ width: 150, height: 150, borderRadius: "50%" }}
                        src={
                          typeof profile?.company?.logo === "string"
                            ? `${baseURL}/${profile?.company?.logo}`
                            : URL.createObjectURL(
                                profile?.company?.logo as Blob
                              )
                        }
                      />
                    ) : (
                      <SvgCompany width={150} height={150} />
                    )}
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
                    {profile?.company?.website}
                  </Link>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleModalOpen}
                  >
                    ?????????????? ?????????? ????????????????????
                  </Button>
                </Paper>
              </Stack>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Stack direction="column" spacing={2}>
              <Paper elevation={3}>
                <Card sx={{ position: "relative" }}>
                  <CardHeader title="?????? ??????" />
                  <CardContent>
                    ?????????????????? ?????????????????????? ??????-???????????????????? ???? React ?? Redux ?????? 3
                    ????????, ???? ?????????????? 1.5 ???????? ?? ???????????????????????? ????????????????????. ????????
                    ???????? ???????????????????? ???????????????????? ?????????????????? ??????????, ????????????????????
                    ?????????????????? ????????????????, ???????????? ?? ?????????????? ?????????? ??????????????.
                    ?????????????????????????????????? ?????????????????? ?????? ???????????? 4 ??????. ????????????
                    JavaScript ???????? ???????? ?? Python.
                  </CardContent>
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

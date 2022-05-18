import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { BorderedInput } from "components/BorderedInput/BorderedInput";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import bgMain from "../../../assets/images/bg-main.jpeg";
import { ButtonModes } from "./constants";

const Main = () => {
  const navigate = useNavigate();
  const { authStore } = useStores();
  const [alignment, setAlignment] = React.useState<ButtonModes>(
    ButtonModes.Students
  );
  const [search, setSearch] = React.useState<string>("");
  const handleChange = (_e: any, value: ButtonModes) => {
    setAlignment(value);
  };
  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search/?search=${search}`);
  };

  return (
    <main>
      <Box
        sx={{
          padding: "105px 0",
          background: `url(${bgMain})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 1440,
            padding: "0 15px",
            margin: "0 auto",
          }}
        >
          <Paper>
            <Grid container>
              <Grid
                item
                sm={8}
                sx={{
                  padding: "64px 32px 32px 32px",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      variant="h4"
                      fontWeight="700"
                      sx={{
                        fontSize: "1.7rem",
                      }}
                    >
                      Поиск стажировок
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ fontSize: "1.3rem" }}
                    >
                      Искать стажировки еще никогда не было так просто.
                    </Typography>
                  </Grid>

                  <form onSubmit={handleSearchSubmit}>
                    <Grid
                      item
                      container
                      sx={(theme) => ({ marginTop: theme.spacing(5) })}
                      wrap="nowrap"
                    >
                      <Grid container item>
                        <BorderedInput
                          placeholder="Позиция, навыки или компания"
                          sx={{ width: "100%" }}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          color="success"
                          variant="contained"
                          type="submit"
                          sx={{
                            height: "100%",
                            borderRadius: 0,
                            borderTopRightRadius: 3,
                            borderBottomRightRadius: 3,
                            marginLeft: "-2px",
                            zIndex: 99,
                            whiteSpace: "nowrap",
                            backgroundColor: "#008563",
                          }}
                        >
                          Перейти к поиску
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>

              {!authStore.getUserObject && (
                <Grid
                  item
                  sm={4}
                  sx={{
                    background: "#E1F5FE",
                    padding: "64px 32px 32px 32px",
                  }}
                >
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="body1" fontWeight="600">
                        Вы работодатель?
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{ fontSize: "1.6rem" }}
                      >
                        Опубликуйте вакансии
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={(theme) => ({ marginTop: theme.spacing(5) })}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        href="/auth/company/register"
                        sx={{ height: 50, marginTop: "2px" }}
                      >
                        Создать Вакансию
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </main>
  );
};

export default observer(Main);

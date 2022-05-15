import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Input,
  Paper,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { BorderedInput } from "components/BorderedInput/BorderedInput";
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/SearchInput";
import { ButtonModes, ROLE_MESSAGES } from "./constants";

const Main = () => {
  const navigate = useNavigate();
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
          background:
            "url(https://d1d8tdgb57avhs.cloudfront.net/assets/home/cb_brand_refresh_banner-8de60da8b7da6cd5d0e6c3752231dac6eea09fe5ab145374d35ee3165c968a8d.jpg)",
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
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        color="success"
                        variant="contained"
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
                </Grid>
              </Grid>

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
                  <Grid item sx={(theme) => ({ marginTop: theme.spacing(5) })}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ height: 50, marginTop: "2px" }}
                    >
                      Создать Вакансию
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </main>
  );
};

export default Main;

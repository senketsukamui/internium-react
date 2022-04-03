import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/SearchInput";
import { ButtonModes, ROLE_MESSAGES } from "./constants";

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="sm">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              size="large"
              exclusive
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ToggleButton value={ButtonModes.Students}>
                Студентам
              </ToggleButton>
              <ToggleButton value={ButtonModes.Companies}>
                Компаниям
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography
              sx={{
                marginTop: "20px",
              }}
              gutterBottom
              align="center"
              variant="h3"
              component="div"
            >
              {ROLE_MESSAGES[alignment]}
            </Typography>
            <SearchInput
              onSubmit={handleSearchSubmit}
              value={search}
              onChange={handleSearchChange}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Main;

import { SearchOffOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SpecializationFilterModal from "components/SpecializationFilterModal";
import { useStores } from "hooks/useStores";
import { isEmpty } from "lodash";
import React, { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortTypes } from "../Search/constants";
import queryString from "query-string";
import { observer } from "mobx-react";
import InternCard from "components/InternCard";

const buttonStyles = {
  height: "56px",
  textTransform: "capitalize",
  color: "currentColor",
  borderColor: "rgba(0, 0, 0, 0.23)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "currentColor",
    borderColor: "currentColor",
  },
};

const InternSearch = () => {
  const { internsStore } = useStores();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | number | null>(
    searchParams.get("search") || ""
  );
  const [location, setLocation] = useState<string | null>(
    searchParams.get("location") || ""
  );
  const [abilities, setAbilities] = useState<number[]>(
    searchParams.getAll("abilities").map((i) => Number(i)) || []
  );
  const closeModal = () => {
    setModalOpen(false);
  };

  const params = React.useMemo(
    () =>
      queryString.stringify(
        {
          search,
          location,
          abilities,
        },
        { arrayFormat: "bracket" }
      ),
    [search, location, abilities]
  );

  const interns = internsStore.getInterns;

  const handleOpenSpecializationModal = () => {
    setModalOpen(true);
  };

  const handleSearch = () => {
    internsStore.getInternsList(params);
  };

  React.useEffect(() => {
    internsStore.getInternsList(params);
  }, []);

  React.useEffect(() => {
    setSearchParams(params);
  }, [params]);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={(theme) => ({ paddingTop: theme.spacing(8) })}
      >
        <Container>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item flexGrow="1">
                <OutlinedInput
                  endAdornment={<SearchOffOutlined color="primary" />}
                  placeholder="Поиск"
                  fullWidth
                  value={search}
                  onChange={(e: SyntheticEvent) => {
                    setSearch(e.target.value);
                  }}
                  sx={{
                    marginRight: 1,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  sx={(theme) => ({
                    height: "100%",
                    padding: `0 ${theme.spacing(3)}`,
                  })}
                >
                  Поиск
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "16px" }}>
              <Grid item>
                <FormControl>
                  <InputLabel>Локация</InputLabel>
                  <OutlinedInput
                    fullWidth
                    value={location}
                    label="Локация"
                    sx={{ minWidth: "120px" }}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleOpenSpecializationModal}
                  sx={buttonStyles}
                >
                  {isEmpty(abilities)
                    ? "Навыки"
                    : `Выбрано ${abilities.length} навыков`}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Divider sx={(theme) => ({ paddingTop: theme.spacing(5) })} />

        <Container sx={(theme) => ({ marginTop: theme.spacing(2) })}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid
                item
                container
                direction="column"
                spacing={2}
                sx={{ width: "45%" }}
              >
                {interns?.map((item) => (
                  <Grid item>
                    <InternCard item={item} key={item.id} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <SpecializationFilterModal
        open={modalOpen}
        closeModal={closeModal}
        abilities={abilities}
        setAbilities={setAbilities}
      />
    </>
  );
};

export default observer(InternSearch);

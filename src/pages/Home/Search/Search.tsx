import { SearchOffOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortByLabels, SortByTypes, SortLabels, SortTypes } from "./constants";
import queryString from "query-string";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import SpecializationFilterModal from "components/SpecializationFilterModal/SpecializationFilterModal";
import {
  LocationStatuses,
  LocationStatusesTranslations,
  PaidStatuses,
  PaidStatusesTranslations,
} from "components/VacancyModal/constants";
import { VacancyModel } from "store/vacancies/types";
import VacancyCard from "components/VacancyCard";
import { VacancyDetailsCard } from "components/VacancyDetailsCard/VacancyDetailsCard";
import { isEmpty } from "lodash";

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

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string | number | null>(
    searchParams.get("search") || ""
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<SortTypes>(
    (searchParams.get("sortType") as SortTypes) || SortTypes.desc
  );
  const [sortBy, setSortBy] = useState<SortByTypes>(
    (searchParams.get("sortBy") as SortByTypes) || SortByTypes.bestMatch
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [abilities, setAbilities] = useState<number[]>(
    searchParams.getAll("abilities").map((i) => Number(i)) || []
  );
  const [salary, setSalary] = useState<number[]>([
    Number(searchParams.get("salaryFrom")) || 0,
    Number(searchParams.get("salaryTo")) || 1000000,
  ]);
  const [location, setLocation] = useState<LocationStatuses>(
    (searchParams.get("location") as LocationStatuses) || undefined
  );

  const [paid, setPaid] = useState<PaidStatuses>(
    (searchParams.get("paid") as PaidStatuses) || PaidStatuses.PAID
  );

  const params = useMemo(
    () =>
      queryString.stringify(
        {
          sortType,
          sortBy,
          search,
          paid,
          location,
          salaryFrom: salary[0],
          salaryTo: salary[1],
          abilities,
        },
        { arrayFormat: "bracket" }
      ),
    [sortType, sortBy, search, paid, location, salary, abilities]
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { vacanciesStore } = useStores();

  const sortByOptions = React.useMemo(
    () =>
      Object.values(SortByTypes).map((type: SortByTypes) => (
        <MenuItem key={type} value={type}>
          {SortByLabels[type]}
        </MenuItem>
      )),
    []
  );

  const locationOptions = React.useMemo(
    () =>
      Object.values(LocationStatuses).map((status: LocationStatuses) => (
        <MenuItem key={status} value={status}>
          {LocationStatusesTranslations[status]}
        </MenuItem>
      )),
    []
  );

  const paidOptions = React.useMemo(
    () =>
      Object.values(PaidStatuses).map((status: PaidStatuses) => (
        <MenuItem key={status} value={status}>
          {PaidStatusesTranslations[status]}
        </MenuItem>
      )),
    []
  );

  useEffect(() => {
    setSearchParams(params);
  }, [params]);

  useEffect(() => {
    vacanciesStore.getVacancies(params);
  }, []);

  const handleOpenSpecializationModal = () => {
    setModalOpen(true);
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    setSalary(newValue as number[]);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    console.log(params);
    vacanciesStore.getVacancies(params);
  };

  const salaryMarks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1000000,
      label: 1000000,
    },
  ];

  const closeModal = () => {
    setModalOpen(false);
  };

  const [displayVacancy, setDisplayVacancy] = useState<VacancyModel | null>(
    null
  );

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
                <Select
                  value={sortBy}
                  onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ minWidth: "40%" }}
                >
                  {sortByOptions}
                </Select>
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

                  <Select
                    fullWidth
                    value={location}
                    label="Локация"
                    sx={{ minWidth: "120px" }}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {locationOptions}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl>
                  <InputLabel>Оплачиваемая</InputLabel>

                  <Select
                    fullWidth
                    onChange={(e) => setPaid(e.target.value)}
                    value={paid}
                    label="Оплачиваемая"
                    sx={{ minWidth: "100px" }}
                  >
                    {paidOptions}
                  </Select>
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

              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={buttonStyles}
                  onClick={handleMenuClick}
                >
                  Зарплата
                </Button>
                <Menu
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={({ children }) => (
                      <Box
                        sx={{
                          width: "300px",
                          height: "75px",
                          padding: 3,
                        }}
                      >
                        {children}
                      </Box>
                    )}
                  >
                    <Slider
                      min={5000}
                      max={1000000}
                      valueLabelDisplay="auto"
                      step={5000}
                      value={salary}
                      marks={salaryMarks}
                      onChange={handleSalaryChange}
                    />
                  </MenuItem>
                </Menu>
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
                <Grid item container justifyContent="space-between">
                  <Grid
                    item
                    sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
                  >
                    <Typography variant="caption">
                      {/* TODO: Клик по каждой штуке меняет сортировку */}
                      Сортировка по:{" "}
                      <Typography
                        onClick={() => setSortType(SortTypes.asc)}
                        display="inline"
                        sx={{
                          fontWeight:
                            sortType === SortTypes.asc ? "bold" : "normal",
                          cursor: "pointer",
                        }}
                      >
                        возрастанию
                      </Typography>{" "}
                      -{" "}
                      <Typography
                        sx={{
                          fontWeight:
                            sortType === SortTypes.desc ? "bold" : "normal",
                          cursor: "pointer",
                        }}
                        display="inline"
                        onClick={() => setSortType(SortTypes.desc)}
                      >
                        убыванию
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={(theme) => ({ paddingRight: theme.spacing(2) })}
                  >
                    <Typography variant="caption">Страница 1 из 10</Typography>
                  </Grid>
                </Grid>

                {vacanciesStore.getVacanciesValue?.map((item) => (
                  <Grid item>
                    <VacancyCard
                      item={item}
                      key={item.id}
                      onClick={(item) => {
                        setDisplayVacancy(item);
                      }}
                      isActive={item.id === displayVacancy?.id}
                    />
                  </Grid>
                ))}

                <Stack spacing={2} justifyContent="center" sx={{ padding: 2 }}>
                  <Pagination
                    count={10}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                      "& ul": {
                        justifyContent: "center",
                      },
                    }}
                  />
                </Stack>
              </Grid>

              {displayVacancy && (
                <Grid
                  item
                  flexGrow="1"
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    height: "calc(100vh - 48px)",
                    width: "55%",
                  }}
                >
                  <VacancyDetailsCard item={displayVacancy} />
                </Grid>
              )}
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

export default observer(Search);

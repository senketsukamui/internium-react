import { SearchOffOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
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

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string | number | null>(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { vacanciesStore } = useStores();

  const [sortType, setSortType] = useState<SortTypes>(
    (searchParams.get("sortType") as SortTypes) || SortTypes.desc
  );
  const [sortBy, setSortBy] = useState<SortByTypes>(
    (searchParams.get("sortBy") as SortByTypes) || SortByTypes.bestMatch
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [abilities, setAbilities] = useState<number[]>([]);
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

  const sortOptions = React.useMemo(
    () =>
      Object.values(SortTypes).map((type: SortTypes) => (
        <MenuItem key={type} value={type}>
          {SortLabels[type]}
        </MenuItem>
      )),
    []
  );

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
    const params = queryString.stringify(
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
    );

    setSearchParams(params);
    vacanciesStore.getVacancies(params);
  }, [sortType, search, sortBy, paid, location, salary, abilities]);

  const handleOpenSpecializationModal = () => {
    setModalOpen(true);
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    setSalary(newValue as number[]);
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
                  variant="contained"
                  fullWidth
                  onClick={handleOpenSpecializationModal}
                >
                  Навыки
                </Button>
              </Grid>

              <Grid item>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  gutterBottom
                >
                  Зарплата (<sup>заменить на два инпута?</sup>)
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Slider
                    min={5000}
                    max={1000000}
                    valueLabelDisplay="auto"
                    step={5000}
                    value={salary}
                    marks={salaryMarks}
                    onChange={handleSalaryChange}
                  />
                </Box>
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
                      Сортировка по: <b>возрастанию</b> - убыванию
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

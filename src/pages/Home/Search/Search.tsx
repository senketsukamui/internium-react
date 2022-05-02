import { ProfileFilled, ProfileOutlined } from "@ant-design/icons";
import { SearchOffOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortByLabels, SortByTypes, SortLabels, SortTypes } from "./constants";
import queryString from "query-string";
import CheckboxGroup from "components/CheckboxGroup";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import SpecializationFilterModal from "components/SpecializationFilterModal/SpecializationFilterModal";
import {
  LocationStatuses,
  LocationStatusesTranslations,
  PaidStatuses,
  PaidStatusesTranslations,
} from "components/VacancyModal/constants";
import { Ability } from "store/specializations/types";
import { VacancyModel } from "store/vacancies/types";

interface SalaryFilter {
  salaryFrom: number;
  salaryTo: number;
}

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
  const [salary, setSalary] = useState<SalaryFilter>({
    salaryFrom: Number(searchParams.get("salaryFrom")) || 0,
    salaryTo: Number(searchParams.get("salaryTo")) || 0,
  });
  const [location, setLocation] = useState<LocationStatuses>(
    LocationStatuses.REMOTE
  );

  const [paid, setPaid] = useState<PaidStatuses>(PaidStatuses.PAID);

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
        salaryFrom: salary.salaryFrom,
        salaryTo: salary.salaryTo,
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

  const handleSalaryChange = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value || 0 });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            sx={{
              marginBottom: 1,
              padding: 2,
            }}
          >
            <Stack spacing={2} divider={<Divider flexItem />}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                }}
                color="primary"
              >
                Стажировки
              </Typography>

              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
              </Container>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Select
                  value={sortType}
                  onChange={(e: SelectChangeEvent) =>
                    setSortType(e.target.value)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ minWidth: "40%" }}
                >
                  {sortOptions}
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e: SelectChangeEvent) => setSortBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ minWidth: "40%" }}
                >
                  {sortByOptions}
                </Select>
              </Container>
            </Stack>
          </Paper>
          <Paper>
            <Stack spacing={2}>
              {vacanciesStore.getVacanciesValue()?.map((item: VacancyModel) => (
                <Card key={item.id}>
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography paragraph>{item.description}</Typography>
                    {item?.abilities.map((ability: Ability) => (
                      <Chip key={ability.id} label={ability.title} />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
          <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handlePageChange} />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ padding: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleOpenSpecializationModal}
            >
              Выбрать специализацию и навыки
            </Button>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.2rem", marginTop: 2 }}
              gutterBottom
            >
              Локация
            </Typography>
            <Select
              fullWidth
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            >
              {locationOptions}
            </Select>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.2rem", marginTop: 2 }}
              gutterBottom
            >
              Оплачиваемая
            </Typography>
            <Select
              fullWidth
              onChange={(e) => setPaid(e.target.value)}
              value={paid}
            >
              {paidOptions}
            </Select>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              gutterBottom
            >
              Зарплата
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="От"
                type="number"
                name="salaryFrom"
                onChange={handleSalaryChange}
                value={salary.salaryFrom}
              />
              <TextField
                label="До"
                type="number"
                onChange={handleSalaryChange}
                name="salaryTo"
                value={salary.salaryTo}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <SpecializationFilterModal
        open={modalOpen}
        closeModal={closeModal}
        abilities={abilities}
        setAbilities={setAbilities}
      />
    </main>
  );
};

export default observer(Search);

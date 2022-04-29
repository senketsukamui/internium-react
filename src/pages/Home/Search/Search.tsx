import { ProfileFilled, ProfileOutlined } from "@ant-design/icons";
import { SearchOffOutlined } from "@mui/icons-material";
import {
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
  Typography,
} from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortByLabels, SortByTypes, SortLabels, SortTypes } from "./constants";
import queryString from "query-string";
import CheckboxGroup from "components/CheckboxGroup";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string | number | null>(
    searchParams.get("search")
  );
  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { vacanciesStore } = useStores();

  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortByTypes>(SortByTypes.bestMatch);

  const sortOptions = Object.values(SortTypes).map((type: SortTypes) => (
    <MenuItem key={type} value={type}>
      {SortLabels[type]}
    </MenuItem>
  ));

  const sortByOptions = Object.values(SortByTypes).map((type: SortByTypes) => (
    <MenuItem key={type} value={type}>
      {SortByLabels[type]}
    </MenuItem>
  ));

  useEffect(() => {
    const currentSearchString = searchParams.get("search") || "";
    setSearchParams(
      queryString.stringify({
        sort,
        sortBy,
        search: currentSearchString,
      })
    );
  }, [sort, search, sortBy]);

  useEffect(() => {
    vacanciesStore.getVacancies(searchParams);
  }, [sort, search, sortBy]);

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
                  value={sort}
                  onChange={(e: SelectChangeEvent) => setSort(e.target.value)}
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
              {vacanciesStore.getVacanciesValue()?.map((item) => (
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
                    {item?.abilities.map((ability) => (
                      <Chip label={ability.title} />
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
            <CheckboxGroup
              label="Сфера деятельности"
              options={{
                abc: { checked: false, id: "abc" },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
};

export default observer(Search);

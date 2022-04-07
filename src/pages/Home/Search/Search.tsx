import { ProfileFilled, ProfileOutlined } from "@ant-design/icons";
import { SearchOffOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortLabels, SortTypes } from "./constants";
import queryString from "query-string";
import CheckboxGroup from "components/CheckboxGroup";

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string | number | null>(
    searchParams.get("search")
  );
  const [sort, setSort] = useState<SortTypes>(SortTypes.Popularity);

  const sortOptions = Object.values(SortTypes).map((type: string) => (
    <MenuItem key={type} value={type}>
      {SortLabels[type]}
    </MenuItem>
  ));
  console.log();

  useEffect(() => {
    const currentSearchString = searchParams.get("search") || "";
    console.log(currentSearchString);
    setSearchParams(
      queryString.stringify({
        sort,
        search: currentSearchString,
      })
    );
  }, [sort]);

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
                  justifyContent: "space-between",
                }}
                disableGutters
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
                <Select
                  value={sort}
                  onChange={(e: SelectChangeEvent) => setSort(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ minWidth: "40%" }}
                >
                  {sortOptions}
                </Select>
              </Container>
            </Stack>
          </Paper>
          <Paper>
            <Stack spacing={1}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Компания
                  </Typography>
                  <Typography paragraph>
                    Привет это я твой единственный зритель
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Paper>
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

export default Search;
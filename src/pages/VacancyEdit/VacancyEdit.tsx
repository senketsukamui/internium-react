import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  LocationStatuses,
  LocationStatusesTranslations,
  PaidStatuses,
  PaidStatusesTranslations,
} from "components/VacancyModal/constants";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { vacancyEditSchema } from "./constants";
import { useStores } from "hooks/useStores";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import SpecializationSelect from "components/SpecializationSelect";
import { Ability } from "store/specializations/types";

interface VacancyFormValues {
  title: string;
  paid: PaidStatuses;
  location: LocationStatuses;
  salary: number;
  description: string;
}

const VacancyEdit = () => {
  const { id } = useParams();
  const [abilities, setAbilities] = React.useState<number[]>([]);

  const navigate = useNavigate();

  const { control, handleSubmit, reset, watch, formState } =
    useForm<VacancyFormValues>({
      resolver: yupResolver(vacancyEditSchema),
      defaultValues: {
        title: "",
        paid: PaidStatuses.PAID,
        location: LocationStatuses.REMOTE,
        description: "",
        salary: 0,
      },
    });

  const { vacanciesStore } = useStores();

  const vacancy = vacanciesStore.getVacancyValue;

  React.useEffect(() => {
    if (vacancy) {
      setAbilities(vacancy.abilities.map((item: Ability) => item.id));
      reset({
        title: vacancy.title,
        paid: vacancy.paid,
        location: vacancy.location,
        description: vacancy.description,
        salary: vacancy.salary,
      });
    }
  }, [vacancy]);

  React.useEffect(() => {
    vacanciesStore.getVacancy(id);
  }, []);

  const redirectToVacancy = () => {
    navigate(`/vacancy/${vacancy?.id}`);
  };

  const onSubmit = (values: VacancyFormValues) => {
    vacanciesStore
      .updateVacancy(
        {
          ...values,
          abilities,
        },
        vacancy.id
      )
      .then(() => redirectToVacancy());
  };

  return (
    <Grid
      sx={{
        padding: "30px 180px",
      }}
      container
      spacing={2}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
        }}
      >
        {vacanciesStore.loading ? (
          <CircularProgress />
        ) : (
          <Box onSubmit={handleSubmit(onSubmit)} component="form">
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
              {`Обновить вакансию ${vacancy?.title}`}
            </Typography>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={Boolean(fieldState?.error)}
                  helperText={
                    fieldState?.error ? "Пожалуйста введите название" : null
                  }
                  fullWidth
                  required
                  type="title"
                  label="Название"
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  error={Boolean(fieldState?.error)}
                  fullWidth
                  required
                  type="location"
                  sx={{ marginBottom: 1 }}
                >
                  {Object.keys(LocationStatuses).map((status) => (
                    <MenuItem value={status}>
                      {LocationStatusesTranslations[status as LocationStatuses]}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="paid"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  error={Boolean(fieldState?.error)}
                  fullWidth
                  required
                  type="paid"
                  sx={{ marginBottom: 1 }}
                >
                  {Object.keys(PaidStatuses).map((status) => (
                    <MenuItem value={status}>
                      {PaidStatusesTranslations[status as PaidStatuses]}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {watch("paid") === PaidStatuses.PAID && (
              <Controller
                name="salary"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState?.error)}
                    helperText={
                      fieldState?.error ? "Пожалуйста введите зарплату" : null
                    }
                    fullWidth
                    required
                    type="salary"
                    label="Зарплата"
                    sx={{ marginBottom: 1 }}
                  />
                )}
              />
            )}
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={Boolean(fieldState?.error)}
                  helperText={
                    fieldState?.error ? "Пожалуйста введите описание" : null
                  }
                  fullWidth
                  required
                  type="description"
                  label="Описание"
                  multiline
                  rows={3}
                  sx={{ marginBottom: 1 }}
                />
              )}
            />
            <SpecializationSelect
              abilities={abilities}
              setAbilities={setAbilities}
            />
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" type="submit">
                Обновить
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={redirectToVacancy}
              >
                Назад
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default observer(VacancyEdit);

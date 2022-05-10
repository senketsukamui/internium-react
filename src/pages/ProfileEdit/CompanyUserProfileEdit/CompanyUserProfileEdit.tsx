import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { CompanyUpdateInterface, CompanyUserUpdateInterface } from "api/types";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "store/companies/types";
import { companyUpdateSchema } from "../CompanyProfileEdit/constants";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { companyUserUpdateSchema } from "./constants";

const CompanyUserProfileEdit: React.FC = () => {
  const { id } = useParams();
  const { companyUsersStore } = useStores();
  const navigate = useNavigate();
  const profile = companyUsersStore.getProfile;

  const { control, handleSubmit, reset, watch, formState } =
    useForm<CompanyUserUpdateInterface>({
      resolver: yupResolver(companyUserUpdateSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        middleName: "",
        position: "",
        phone: "",
        birthdate: "",
      },
    });

  const onSubmit = (values: CompanyUserUpdateInterface) => {
    companyUsersStore
      .updateCompanyUserProfile(
        {
          ...values,
        },
        id
      )
      .then(() => {
        navigate(`/company/profile/${id}`);
      });
  };

  React.useEffect(() => {
    companyUsersStore.getCompanyUserProfile(id);
  }, []);

  React.useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.userInfo.firstName,
        middleName: profile.userInfo.middleName,
        lastName: profile.userInfo.lastName,
        position: profile.userInfo.position,
        phone: profile.userInfo.phone,
        birthdate: profile.userInfo.birthdate,
      });
    }
  }, [profile]);

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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
            Описание
          </Typography>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error ? "Пожалуйста введите ваше имя" : null
                }
                required
                fullWidth
                type="firstName"
                label="Имя"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error ? "Пожалуйста введите вашу фамилию" : null
                }
                required
                fullWidth
                type="secondName"
                label="Фамилия"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            )}
          />
          <Controller
            name="middleName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="middleName"
                label="Отчество"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            )}
          />
          <Controller
            name="position"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error ? "Пожалуйста введите вашу позицию" : null
                }
                required
                fullWidth
                type="position"
                label="Позиция"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error ? "Пожалуйста введите ваш телефон" : null
                }
                required
                fullWidth
                type="phone"
                label="Телефон"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="birthdate"
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    label="Дата рождения*"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ marginBottom: 1 }}
                      />
                    )}
                  />
                );
              }}
            />
          </LocalizationProvider>
          <Button
            sx={{
              marginTop: 3,
            }}
            variant="contained"
            type="submit"
          >
            Обновить
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default observer(CompanyUserProfileEdit);

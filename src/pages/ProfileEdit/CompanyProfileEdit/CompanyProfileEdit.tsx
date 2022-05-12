import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { CompanyUpdateInterface } from "api/types";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyUpdateSchema } from "./constants";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "store/companies/types";

interface CompanyProps {
  user?: any;
}

const CompanyProfileEdit: React.FC<CompanyProps> = ({ user }) => {
  const { id } = useParams();
  const { companiesStore } = useStores();
  const navigate = useNavigate();
  const profile = user || companiesStore.companyProfile;

  console.log(user, profile);

  const { control, handleSubmit, reset, watch, formState } =
    useForm<CompanyUpdateInterface>({
      resolver: yupResolver(companyUpdateSchema),
      defaultValues: {
        city: "",
        description: "",
        shortDescription: "",
        website: "",
      },
    });

  const onSubmit = (values: CompanyUpdateInterface) => {
    companiesStore
      .updateCompanyProfile(
        {
          ...values,
          hidden: profile.hidden,
        },
        id
      )
      .then(() => {
        navigate(`/company/profile/${id}`);
      });
  };

  React.useEffect(() => {
    if (!user) {
      companiesStore.getCompanyProfile(id);
    }
  }, []);

  React.useEffect(() => {
    if (profile) {
      reset({
        city: profile.city,
        description: profile.description,
        shortDescription: profile.shortDescription,
        website: profile.website,
      });
    }
  }, [profile]);

  console.log(formState.errors);

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
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <ReactQuill
                  value={field.value}
                  onChange={field.onChange}
                  theme="snow"
                />
                {fieldState.error && (
                  <Typography sx={{ color: "red" }}>
                    Пожалуйста введите описание
                  </Typography>
                )}
              </>
            )}
          />
          <Controller
            name="shortDescription"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error
                    ? "Пожалуйста введите краткое описание"
                    : null
                }
                required
                fullWidth
                type="shortDescription"
                label="Краткое описание"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error ? "Пожалуйста введите город" : null
                }
                required
                fullWidth
                type="city"
                label="Город"
                sx={{ marginBottom: 1 }}
              />
            )}
          />
          <Controller
            name="website"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState?.error)}
                helperText={
                  fieldState?.error ? "Пожалуйста введите веб-сайт" : null
                }
                required
                fullWidth
                type="website"
                label="Веб-сайт"
                sx={{ marginBottom: 1 }}
              />
            )}
          />
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

export default observer(CompanyProfileEdit);

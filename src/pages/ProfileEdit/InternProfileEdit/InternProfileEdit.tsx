import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { internUpdateSchema } from "./constants";
import { InternUpdateInterface } from "store/interns/types";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import SpecializationSelect from "components/SpecializationSelect";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";

interface InternProps {
  user?: any;
}

const InternProfileEdit: React.FC<InternProps> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | File>(user?.avatar);
  const handleAvatarSelect = (e) => {
    setAvatar(e.target.files[0]);
  };
  const { internsStore, authStore } = useStores();

  const handleAvatarDelete = () => {
    authStore.removeCurrentUserAvatar().then(() => setAvatar(null));
  };

  const handleAvatarUpload = () => {
    if (avatar) {
      authStore.addCurrentUserAvatar(avatar);
    }
  };

  const profile = user || internsStore.getProfile;
  const { control, handleSubmit, reset, watch, formState } =
    useForm<InternUpdateInterface>({
      resolver: yupResolver(internUpdateSchema),
      defaultValues: {
        location: "",
        description: "",
        birthdate: "",
        gender: false,
        firstName: "",
        lastName: "",
        middleName: "",
      },
    });

  const [abilities, setAbilities] = React.useState<number[]>([]);
  const onSubmit = (values: InternUpdateInterface) => {
    internsStore
      .updateInternProfile(
        {
          ...values,
          abilities,
        },
        id
      )
      .then(() => {
        navigate(`/intern/profile/${id}`);
      });
  };

  React.useEffect(() => {
    if (!user) {
      internsStore.getInternProfile(id);
    }
  }, []);

  React.useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        location: profile.location,
        birthdate: profile.birthdate,
        description: profile.description,
        gender: profile.gender,
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
        <Grid
          container
          direction="column"
          sx={{ alignItems: "center" }}
          spacing={1}
        >
          <Grid item>
            <Box
              component="img"
              sx={{ width: 150, height: 150 }}
              src={
                typeof avatar === "string"
                  ? `https://internium.monkeyhackers.org/${avatar}`
                  : URL.createObjectURL(avatar as Blob)
              }
            />
          </Grid>
          <Grid item>
            <input type="file" onChange={handleAvatarSelect} />
          </Grid>
          <Grid item>
            <Button
              color="error"
              variant="outlined"
              onClick={handleAvatarDelete}
              sx={{ marginRight: 1 }}
            >
              Удалить
            </Button>
            <Button variant="outlined" onClick={handleAvatarUpload}>
              Сохранить
            </Button>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
          <Controller
            name="location"
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
                type="location"
                label="Город"
                sx={{ marginBottom: 1 }}
              />
            )}
          />
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
            name="gender"
            control={control}
            defaultValue={false}
            render={({ field, fieldState }) => (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Женский</Typography>
                <Switch {...field} />
                <Typography>Мужской</Typography>
              </Stack>
            )}
          />
          <SpecializationSelect
            abilities={abilities}
            setAbilities={setAbilities}
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

export default observer(InternProfileEdit);

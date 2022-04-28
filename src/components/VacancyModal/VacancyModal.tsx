import { yupResolver } from "@hookform/resolvers/yup";
import { FireplaceTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SpecializationSelect from "components/SpecializationSelect";
import { useStores } from "hooks/useStores";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  LocationStatuses,
  LocationStatusesTranslations,
  PaidStatuses,
  PaidStatusesTranslations,
  vacancySchema,
} from "./constants";
interface VacancyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

interface VacancyFormValues {
  title: string;
  paid: PaidStatuses;
  location: LocationStatuses;
  salary: number;
  description: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "50%",
  overflow: "auto",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VacancyModal: FC<VacancyModalProps> = ({ open, setOpen }) => {
  const { vacanciesStore, authStore } = useStores();
  const handleModalClose = () => {
    setOpen(false);
  };
  const [abilities, setAbilities] = React.useState<number[]>([]);

  const { control, handleSubmit, watch, formState } =
    useForm<VacancyFormValues>({
      resolver: yupResolver(vacancySchema),
      defaultValues: {
        title: "",
        paid: PaidStatuses.PAID,
        location: LocationStatuses.REMOTE,
        description: "",
        salary: 0,
      },
    });

  const onSubmit = (values: VacancyFormValues) => {
    vacanciesStore
      .createVacancy({
        ...values,
        abilities,
        companyId: authStore.getUserObject.company.id,
      })
      .then(() => setOpen(false));
  };

  return (
    <Modal onClose={handleModalClose} open={open}>
      <Box sx={style} onSubmit={handleSubmit(onSubmit)} component="form">
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Создать новую вакансию
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
        <Button
          sx={{
            marginTop: 3,
          }}
          variant="contained"
          type="submit"
        >
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default VacancyModal;

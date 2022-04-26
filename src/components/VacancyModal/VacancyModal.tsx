import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VacancyModal: FC<VacancyModalProps> = ({ open, setOpen }) => {
  const handleModalClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit, watch } = useForm<VacancyFormValues>({
    resolver: yupResolver(vacancySchema),
    defaultValues: {
      title: "",
      paid: PaidStatuses.PAID,
      location: LocationStatuses.REMOTE,
      description: "",
      salary: 0,
    },
  });

  return (
    <Modal onClose={handleModalClose} open={open}>
      <Box sx={style} component="form">
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
                  fieldState?.error ? "Пожалуйста введите название" : null
                }
                fullWidth
                required
                type="salary"
                label="Название"
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
        <Button variant="contained">Создать</Button>
      </Box>
    </Modal>
  );
};

export default VacancyModal;

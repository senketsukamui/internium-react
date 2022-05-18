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
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { invitationSchema } from "./constants";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  internId: number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "50%",
  overflow: "auto",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
};

interface InvitationFormValues {
  vacancyId: number;
  message: string;
}

const VacancyInvitationModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  internId,
}) => {
  const { invitationsStore, companiesStore, authStore } = useStores();
  const { control, handleSubmit, watch, formState } =
    useForm<InvitationFormValues>({
      resolver: yupResolver(invitationSchema),
      defaultValues: {
        vacancyId: null,
        message: "",
      },
    });
  const currentUser = authStore.getUserObject;
  const companyVacancies = companiesStore.companyVacancies;

  React.useEffect(() => {
    if (currentUser?.company?.id) {
      companiesStore.getCompanyVacancies(currentUser?.company?.id);
    }
  }, []);

  const onSubmit = (values: InvitationFormValues) => {
    invitationsStore
      .createVacancyInvitation({ ...values, internId })
      .then(() => setOpen(false));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box onSubmit={handleSubmit(onSubmit)} sx={style} component="form">
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Создать новую приглашение
        </Typography>
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={Boolean(fieldState?.error)}
              helperText={
                fieldState?.error ? "Пожалуйста введите сообщение" : null
              }
              fullWidth
              required
              multiline
              type="message"
              label="Сообщение"
              sx={{ marginBottom: 1 }}
            />
          )}
        />
        <Controller
          name="vacancyId"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              error={Boolean(fieldState?.error)}
              fullWidth
              required
              type="vacancyId"
              sx={{ marginBottom: 1 }}
            >
              {companyVacancies?.map((vacancy) => (
                <MenuItem value={vacancy?.id}>{vacancy?.title}</MenuItem>
              ))}
            </Select>
          )}
        />
        <Button
          sx={{
            marginTop: 3,
          }}
          variant="contained"
          type="submit"
          disabled={!companyVacancies?.length}
        >
          Пригласить
        </Button>
      </Box>
    </Modal>
  );
};

export default observer(VacancyInvitationModal);

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
import "react-quill/dist/quill.snow.css";

interface AnnouncementModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  vacancyId: number;
}

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "50%",
  overflow: "auto",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AnnouncementModal: FC<AnnouncementModalProps> = ({
  open,
  setOpen,
  vacancyId,
}) => {
  const { vacanciesStore } = useStores();
  const handleModalClose = () => {
    setOpen(false);
  };

  const [message, setMessage] = React.useState<string>("");

  const onSend = () => {
    vacanciesStore
      .makeVacancyAnnouncement({ message, vacancyId })
      .then(() => handleModalClose());
  };

  return (
    <Modal onClose={handleModalClose} open={open}>
      <Box sx={style}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Отправить сообщение всем откликнувшимся
        </Typography>
        <TextField
          multiline
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          sx={{
            marginTop: 3,
          }}
          variant="contained"
          onClick={onSend}
        >
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default AnnouncementModal;

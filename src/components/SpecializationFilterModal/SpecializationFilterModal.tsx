import { Box, Button, Modal } from "@mui/material";
import SpecializationSelect from "components/SpecializationSelect";
import React, { FC } from "react";

interface FilterModalProps {
  open: boolean;
  closeModal: (value: boolean) => void;
  abilities: number[];
  setAbilities: any;
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

const SpecializationFilterModal: FC<FilterModalProps> = ({
  open,
  closeModal,
  abilities,
  setAbilities,
}) => {
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <SpecializationSelect
          abilities={abilities}
          setAbilities={setAbilities}
        />
        <Button onClick={closeModal} variant="contained" sx={{ marginTop: 2 }}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
};

export default SpecializationFilterModal;

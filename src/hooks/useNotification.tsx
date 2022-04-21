import { SnackbarKey, useSnackbar, VariantType } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/SvgIcon/SvgIcon";
import React, { useEffect, useState } from "react";

interface Notification {
  msg: string;
  variant: string;
}

const useNotification = () => {
  const [conf, setConf] = useState<any>({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key: SnackbarKey | undefined) => (
    <>
      <IconButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
  useEffect(() => {
    if (conf?.msg) {
      let variant = "info";
      if (conf.variant) {
        variant = conf.variant;
      }
      enqueueSnackbar(conf.msg, {
        variant: variant as VariantType,
        autoHideDuration: 5000,
        action,
      });
    }
  }, [conf]);
  return [conf, setConf];
};

export default useNotification;

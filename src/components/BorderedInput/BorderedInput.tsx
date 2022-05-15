import { Input as MuiInput, InputProps, Theme } from "@mui/material";

export const BorderedInput: React.FC<InputProps> = ({ sx, ...props }) => {
  const styles = (theme: Theme) => ({
    height: "50px",
    padding: "15px",
    fontSize: "1rem",
    borderRadius: "3px",
    position: "relative",
    zIndex: 1,
    border: "1px solid #E9E9E9",
    transitionDuration: "0.3s",

    "::before": {
      borderBottom: "none !important",
    },

    "::after": {
      borderBottom: "none !important",
    },

    ...sx,
  });
  return <MuiInput sx={styles} {...props} />;
};

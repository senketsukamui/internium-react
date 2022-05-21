import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const ChatRoom = () => {
  const [input, setInput] = React.useState("");
  return (
    <Box>
      <Grid container>
        <Grid item>
          <Typography>Company</Typography>
        </Grid>
        <Grid item>
          <Typography align="left">Message 1</Typography>
        </Grid>
        <Grid item>
          <Typography align="right">Message 2</Typography>
        </Grid>
      </Grid>
      <Box>
        <TextField value={input} onChange={(e) => setInput(e.target.value)} />
        <Button>Отправить</Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;

import { Alert, AlertTitle } from "@mui/material";
import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import MessageContext from "../contexts/MessageContext";

const Message = () => {
  const { open, setOpen, message, messageType } = useContext(MessageContext);
  console.log(message, messageType);
  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={messageType ? messageType.toLowerCase() : "success"}
      >
        <AlertTitle>{messageType}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default Message;

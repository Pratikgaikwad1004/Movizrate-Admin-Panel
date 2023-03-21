import React, { useState } from "react";
import MessageContext from "../contexts/MessageContext";

const MessageState = (props) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [open, setOpen] = React.useState(false);

  const showMessage = (mtype, mess) => {
    setMessage(mess);
    setMessageType(mtype);
    setOpen(true);
  };

  if (open) {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (
    <MessageContext.Provider
      value={{ showMessage, message, messageType, open, setOpen }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import React from "react";

const DialogBox = ({
  title,
  description,
  open,
  handleClose,
  handleAgree
}: {
  title: string;
  description?: string;
  open: boolean;
  handleClose: () => void;
  handleAgree: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {/* {"Are you sure to delete this Post?"} */}
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Disagree
        </Button>
        <Button onClick={() => handleAgree()} autoFocus color="error">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;

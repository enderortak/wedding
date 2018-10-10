import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import ApiService from "../../../service/ApiService";

const api = new ApiService();

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DeleteDialog = ({ open, onCancel, onConfirm, guest, deleteGuest}) => (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={onCancel}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Davetli silinsin mi?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Davetli silindikten sonra geri döndürülemez. Bu işlemi onaylamak istediğinizden emin misiniz?
              <p>"{guest.name}"</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Hayır
            </Button>
            <Button onClick={onConfirm} color="primary">
              Evet
            </Button>
          </DialogActions>
        </Dialog>
    );

export default DeleteDialog;

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import ApiService from "../../../service/ApiService";

const api = new ApiService();

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleConfirm = () => {
    this.props.deleteTask();
  }
  render() {
    return (
      <React.Fragment>
        <IconButton aria-label="Delete" onClick={this.handleClickOpen} style={{ width: "36px", height: "36px" }}>
          <DeleteIcon style={{ fontSize: "18px" }}/>
        </IconButton>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Yapılacak iş silinsin mi?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Yapılacak iş silindikten sonra geri döndürülemez. Bu işlemi onaylamak istediğinizden emin misiniz?
              <p>"{this.props.task.text}"</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hayır
            </Button>
            <Button onClick={this.handleConfirm} color="primary">
              Evet
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default AlertDialogSlide;

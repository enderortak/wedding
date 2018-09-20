import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';


export default class FormDialog extends React.Component {
  state = {
    open: false,
    values: { text: "" },
  };
  constructor(props){
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSave = () => {
      this.props.addSubtask({
        completed: false,
        text: this.state.values.text,
      });
      this.setState({ open: false });
  }
  handleKeyPress = e => {
    if (e.keyCode === 13) this.handleSave();
    else if(e.keyCode === 27) this.handleClose();
    else return;
  }
  handleChange = e => this.setState({values: {...this.state.values, [e.target.name]: e.target.value}});
  render() {
    return (
      <div style={{ float: "right"}}>
        <IconButton
          aria-label="Add"
          style={{
            width: "36px",
            height: "36px",
            bottom: "6px"
          }}
          onClick={this.handleClickOpen}
        >
          <AddIcon style={{ fontSize: "18px" }} />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
          fullWidth
          onKeyDown={this.handleKeyPress}
        >
          <DialogTitle id="form-dialog-title">Yeni Alt İş</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="text"
              label="Yapılacak"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose} color="default">
              İptal
            </Button>
            <Button variant="contained" onClick={this.handleSave} color="secondary">
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
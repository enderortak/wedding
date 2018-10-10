import { MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import ApiService from '../../../service/ApiService';
const api = new ApiService();

export default class FormDialog extends React.Component {
  state = {
    open: false,
    values: { name: "", table: 0},
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
      this.props.addGuest(this.state.values.table, {
        confirmed: false,
        name: this.state.values.name,
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
    const { tables } = this.props;
    return (
      <React.Fragment>
        <Button variant="fab" color="secondary" aria-label="Add" onClick={this.handleClickOpen} style={{position: "fixed", bottom: "1rem", right: "1rem", zIndex: "2"}}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
          fullWidth
          onKeyDown={this.handleKeyPress}
        >
          <DialogTitle id="form-dialog-title">Yeni Davetli</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Davetli"
              fullWidth
              onChange={this.handleChange}
            />
            <Select
              value={this.state.values.table}
              onChange={this.handleChange}
              inputProps={{
                name: 'table',
              }}
            >
              {tables.map(table => <MenuItem value={table.value}>{table.text}</MenuItem>)}
          </Select>
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
      </React.Fragment>
    );
  }
}
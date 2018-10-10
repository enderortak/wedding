import { 
  Avatar, Badge, Checkbox, Collapse, IconButton, List, ListItem, ListItemSecondaryAction,
  ListItemText, ListItemIcon, ListSubheader, TextField, Typography, Menu, MenuList, MenuItem, Popover, Paper
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { 
  Edit as EditIcon, ExpandLess, ExpandMore, Save as SaveIcon, Person as PersonIcon,
  CheckCircleOutline as Checkmark, MoreHoriz as MoreIcon, Clear as CancelIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import propTypes from "prop-types";
import React, { Component } from "react";
import AddGuest from "./AddGuest";
import DeleteGuestModal from "./DeleteGuestModal";
import ActionsPopup from "./ActionsPopup";
import { draggable } from "./../../../shared/components/DnDHOC";

const styles = theme => ({
  badge: {
    backgroundColor: green[500],
    position: "absolute",
    top: "initial",
    bottom: -7,
    right: -7,
  },
  textBox: {
    paddingLeft: theme.spacing.unit * 2,
  },
  guest: {
    border: "1px solid #DDDDDD",
    background: "#FFFFFF",
  },
  guestAvatar: {
    overflow: "visible"
  },
  guestUnconfirmIcon: {
    width: 24,
    height: 24,
    color: "#fafafa",
    fontSize: "1.2rem"
  }
});

class Guest extends Component {
    static propTypes = {
        guest: propTypes.object.isRequired,
    }
    constructor(props){
      super(props);
    }
    state = {
      menuOpen: false,
      menuAnchor: null,
      deleteDialogOpen: false,
      confirmed: this.props.guest.confirmed,
      name: this.props.guest.name,
      nameReset: this.props.guest.name,
      editNameMode: false,
    };
    // Event handlers
    handleActionsButtonClick = e => { e.stopPropagation(); this.openMenu(e.currentTarget); }
    handleEditButtonClick = e => { this.closeMenu(); this.turnEditModeOn(); }
    handleToggleConfirmButtonClick = e => { this.closeMenu(); this.toggleConfirmation(); }
    handleCancelButtonClick = e => { e.stopPropagation(); this.cancelUpdate(); }
    handleSaveButtonClick = e => { e.stopPropagation(); this.saveUpdate(); }    
    handlePopupClose = e => this.closeMenu();
    handleChange = e =>  this.setState({[e.target.name]: e.target.value})
    handleKeyPress = e => {
      if (e.keyCode === 13) {
        this.turnEditModeOff();
        this.saveUpdate();
      }
      else if(e.keyCode === 27) this.cancelUpdate(e);
      else return;
    }
    handleDeleteButtonClick = () => { this.closeMenu();  this.openDeleteDialog(); }
    handleDeleteDialogCancel = () => this.closeDeleteDialog()
    handleDeleteDialogConfirm = () => { this.props.deleteGuest(); this.closeDeleteDialog(); }

    // Methods
    toggleConfirmation = e => {
      this.setState(
        state => ({ confirmed: !state.confirmed }),
        () => this.saveUpdate()
      );
      
    };
    turnEditModeOn = () => {      
      this.setState(state => ({ editNameMode: true }), () => console.log("edit mode on"));
    };
    turnEditModeOff = () => {      
      this.setState(state => ({ editNameMode: false }));
    };
    saveUpdate = () => {
      this.setState(
        state => ({nameReset: state.name}),
        () => this.props.updateGuest(this.props.tableIndex, {...this.props.guest, name: this.state.name, confirmed: this.state.confirmed})
      );
      this.turnEditModeOff();
    }
    cancelUpdate = (e) => {
      this.setState(state => ({ name: this.state.nameReset }));
      this.turnEditModeOff();
    }
    openMenu = anchor => this.setState({menuOpen: true, menuAnchor: anchor});
    closeMenu = () => this.setState({menuOpen: false, menuAnchor: null});
    openDeleteDialog = () => this.setState({deleteDialogOpen: true})
    closeDeleteDialog = () => this.setState({deleteDialogOpen: false})


    render() {
      const { guest, deleteGuest, classes } = this.props;
      const { 
        editNameMode, confirmed, name,
        menuOpen, menuAnchor, deleteDialogOpen
      } = this.state;
      const { 
        handleSaveButtonClick, handleCancelButtonClick, handleChange, handleKeyPress, handleActionsButtonClick,
        handlePopupClose, handleEditButtonClick, handleDeleteButtonClick, handleDeleteDialogCancel,
        handleDeleteDialogConfirm, handleToggleConfirmButtonClick
       } = this;
      const editModeContent = [
        <TextField
          autoFocus
          name="name"
          value={name}
          margin="none"
          className={classes.textBox}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />,
        <ListItemSecondaryAction>
          <IconButton aria-label="Kaydet" onClick={handleSaveButtonClick}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="İptal" onClick={handleCancelButtonClick}>
            <CancelIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ];
      const displayModeContent = [
        <ListItemText primary={name} />,
        <ListItemSecondaryAction>
          <IconButton
            aria-label="İşlemler"
            onClick={handleActionsButtonClick}
            aria-owns={menuOpen ? 'simple-popper' : null}
            aria-haspopup="true"
          >
            <MoreIcon />
          </IconButton>
        </ListItemSecondaryAction>,
        <ActionsPopup 
          anchor={menuAnchor} 
          open={menuOpen}
          onClose={handlePopupClose}
          actions={[
            {text: "Düzenle", icon: <EditIcon />, onClick: handleEditButtonClick},
            {text: "Sil", icon: <DeleteIcon />, onClick: handleDeleteButtonClick},
            {
              text: confirmed ? "Katılım belirsiz" : "Katılıyor",
              icon: confirmed ? 
                <Avatar className={classes.guestUnconfirmIcon}>?</Avatar>
                :<Checkmark />,
              onClick: handleToggleConfirmButtonClick
            },
          ]}
        />
      ]
      const avatar = (
        <Avatar className={classes.guestAvatar}>              
          <PersonIcon className={classes.guestConfirmIcon}/>
        </Avatar>
      );
      return (
        <React.Fragment>
          <ListItem dense button className={classes.guest}>
            {
              confirmed ? 
              <Badge
                badgeContent={<Checkmark />}
                color="primary"
                classes={{
                  root: classes.root,
                  badge: classes.badge
                }}
              >
                {avatar}
              </Badge> :
              avatar
            }            
            {editNameMode ? editModeContent :  displayModeContent}
          </ListItem>
          <DeleteGuestModal
            guest={guest}
            deleteGuest={deleteGuest}
            open={deleteDialogOpen}
            onCancel={handleDeleteDialogCancel}
            onConfirm={handleDeleteDialogConfirm}
          />
        </React.Fragment>
      );
    }
}

export default withStyles(styles)(draggable(Guest));

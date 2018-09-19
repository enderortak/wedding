import { Checkbox, IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField } from "@material-ui/core";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";
import React from "react";
import DeleteSubtask from "./DeleteSubtask";



export default class Subtask extends React.Component {
  constructor(props){
    super(props);
    this.handleTitleEditButtonClick = this.handleTitleEditButtonClick.bind(this);
    this.handleTitleEditInputBlur = this.handleTitleEditInputBlur.bind(this);
  }
  state = {
    completed: this.props.subtask.completed,
    editTitleMode: false,
    text: this.props.subtask.text,
  };
  toggleComplete = e => {
    e.stopPropagation();
    this.setState(
      state => ({ completed: !state.completed }),
      () => this.props.updateSubtask({...this.props.subtask, completed: this.state.completed})
    );    
  };
  turnTitleEditModeOn = () => {      
    this.setState(state => ({ editTitleMode: true }));
  };
  turnTitleEditModeOff = () => {      
    this.setState(state => ({ editTitleMode: false }));
  };
  updateTitle = title => {
    this.props.updateSubtask({...this.props.subtask, text: title});
    this.setState({updatedText: title});
  }
  cancelTitleUpdate = (e) => {
    this.setState(state => ({ editTitleMode: false, text: this.state.updatedText || this.props.subtask.text }), () => console.log(this.state));
  }
  handleTitleEditButtonClick = e =>{
    e.stopPropagation();
    if (this.state.editTitleMode) {
      this.turnTitleEditModeOff();
      this.updateTitle(this.state.text);
    }
    else this.turnTitleEditModeOn();
  }
  handleTitleEditInputBlur(e){
    if (!e.relatedTarget || e.relatedTarget.id !== `edit-save-subtask-title-button-${this.props.subtask.id}`)
      this.cancelTitleUpdate(e);
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state));
  }
  render() {
    const { subtask } = this.props;
    const { editTitleMode, completed, text } = this.state;
    return (
      <ListItem style={{ padding: "0" }}>
        <Checkbox checked={completed} onClick={this.toggleComplete} />
        {editTitleMode ? (
          <TextField
            autoFocus
            name="text"
            value={text}
            margin="none"
            style={{ paddingLeft: "16px" }}
            onChange={this.handleChange}
            onBlur={this.handleTitleEditInputBlur}
            inputProps={{ style: { fontSize: "0.9rem" } }}
          />
        ) : (
          <ListItemText
            primary={this.state.text}
            primaryTypographyProps={{ variant: "body1" }}
            style={{ fontSize: "0.8rem" }}
          />
        )}
        <ListItemSecondaryAction>
          <IconButton
            aria-label={editTitleMode ? "Save" : "Edit"}
            style={{ width: "36px", height: "36px" }}
            onClick={this.handleTitleEditButtonClick}
            id={`edit-save-subtask-title-button-${subtask.id}`}
          >
            {editTitleMode ? (
              <SaveIcon style={{ fontSize: "18px" }} />
            ) : (
              <EditIcon style={{ fontSize: "18px" }} />
            )}
          </IconButton>
          <DeleteSubtask subtask={subtask} deleteSubtask={this.props.deleteSubtask}/>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

import { Checkbox, Collapse, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, TextField, Typography } from "@material-ui/core";
import { Edit as EditIcon, ExpandLess, ExpandMore, Save as SaveIcon } from "@material-ui/icons";
import _ from "lodash";
import propTypes from "prop-types";
import React, { Component } from "react";
import ApiService from "../../../service/ApiService";
import AddSubtask from "./AddSubtask";
import DeleteTask from "./DeleteTask";
import Subtask from "./Subtask";
import "./Task.css";


const api = new ApiService();
class Task extends Component {
    static propTypes = {
        task: propTypes.object.isRequired,
    }
    constructor(props){
      super(props);
      this.handleTitleEditButtonClick = this.handleTitleEditButtonClick.bind(this);
      this.handleTitleEditInputBlur = this.handleTitleEditInputBlur.bind(this);
      this.handleNoteEditButtonClick = this.handleNoteEditButtonClick.bind(this);
      this.handleNoteEditInputBlur = this.handleNoteEditInputBlur.bind(this);
    }
    state = {
      expanded: false,
      completed: this.props.task.completed,
      editTitleMode: false,
      editNoteMode: false,
      text: this.props.task.text,
      note: this.props.task.note,
      subtasks: this.props.task.subtasks,
    };
    toggleExpand = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };
    contract = () => {
      this.setState({ expanded: false });
    };
    toggleComplete = e => {
      e.stopPropagation();
      this.setState(state => ({ completed: !state.completed }));
      this.props.toggleCompleted();
    };
    turnTitleEditModeOn = () => {      
      this.setState(state => ({ editTitleMode: true }));
    };
    turnTitleEditModeOff = () => {      
      this.setState(state => ({ editTitleMode: false }));
    };
    updateTitle = title => {
      this.props.updateTask({...this.props.task, text: title});
      this.setState({updatedText: title});
    }
    cancelTitleUpdate = (e) => {
      this.setState(state => ({ editTitleMode: false, text: this.state.updatedText || this.props.task.text }), () => console.log(this.state));
    }
    turnNoteEditModeOn = () => {      
      this.setState(state => ({ editNoteMode: true }));
    };
    turnNoteEditModeOff = () => {      
      this.setState(state => ({ editNoteMode: false }));
    };
    updateNote = note => {
      this.props.updateTask({...this.props.task, note});
      this.setState({updatedNote: note});
    }
    cancelNoteUpdate = () => {
      this.setState(state => ({ editNoteMode: false, note: this.state.updatedNote || this.props.task.note }));
    }
    toggleEditNoteMode = e => {
      e.stopPropagation();
      this.setState(state => ({ editNoteMode: !state.editNoteMode }));
    };
    addSubtask = subtask => {
      this.setState(
        state => {
         const {month, task } = this.props;
         const newList = [...state.subtasks, subtask].map(i => ({...i, id: _.uniqueId(month + "." + task.id + ".")}));
         return ({...state, subtasks: newList});
        },
        () => this.props.updateTask({...this.props.task, subtasks: this.state.subtasks})
      )
    }
    deleteSubtask = subtask => {
      this.setState(
        state => ({...state, subtasks: state.subtasks.filter(s => s.id !== subtask.id)}),
        () => this.props.updateTask({...this.props.task, subtasks: this.state.subtasks})
      )
    }
    updateSubtask = subtask => {
      this.setState(
        state => ({...state, subtasks: state.subtasks.map(s => s.id === subtask.id ? subtask : s)}),
        () => this.props.updateTask({...this.props.task, subtasks: this.state.subtasks})
      )
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
      if (!e.relatedTarget || e.relatedTarget.id !== `edit-save-title-button-${this.props.task.id}`)
        this.cancelTitleUpdate(e);
    }
    handleNoteEditButtonClick = e =>{
      e.stopPropagation();
      if (this.state.editNoteMode) {
        this.turnNoteEditModeOff();
        this.updateNote(this.state.note);
      }
      else this.turnNoteEditModeOn();
    }
    handleNoteEditInputBlur(e){
      if (!e.relatedTarget || e.relatedTarget.id !== `edit-save-note-button-${this.props.task.id}`)
        this.cancelNoteUpdate();
    }

    handleChange = e => {
      this.setState({[e.target.name]: e.target.value.replace(/\n\r?/g, "<br />")}, () => console.log(this.state));
    }
    handleKeyPress = e => {
      if (e.keyCode === 13) {
        this.turnTitleEditModeOff();
        this.updateTitle(this.state.text);
      }
      else if(e.keyCode === 27) this.cancelTitleUpdate(e);
      else return;
    }

    render() {
      const { task } = this.props;
      const { editTitleMode, editNoteMode, expanded, completed, note, subtasks } = this.state;
      return (
        <React.Fragment>
          <ListItem
            button
            onClick={this.toggleExpand}
            onDragEnter={this.contract}
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              border: "1px solid #DDDDDD",
              background: "#FFFFFF",
              paddingRight: "110px"
            }}
          >
            <Checkbox checked={completed} onClick={this.toggleComplete} />
            {editTitleMode ? (
              <TextField
                autoFocus
                name="text"
                value={this.state.text}
                margin="none"
                style={{ paddingLeft: "16px" }}
                onBlur={this.handleTitleEditInputBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
              />
            ) : (
              <ListItemText primary={this.state.text} />
            )}
  
            <ListItemSecondaryAction>
              <IconButton
                aria-label={editTitleMode ? "Save" : "Edit"}
                style={{ width: "36px", height: "36px" }}
                onClick={this.handleTitleEditButtonClick}
                id={`edit-save-title-button-${task.id}`}
              >
                {editTitleMode ? (
                  <SaveIcon style={{ fontSize: "18px" }} />
                ) : (
                  <EditIcon style={{ fontSize: "18px" }} />
                )}
              </IconButton>
              <DeleteTask task={task} deleteTask={this.props.deleteTask}/>
              <IconButton
                aria-label="Expand"
                onClick={this.toggleExpand}
                style={{ width: "36px", height: "36px" }}
              >
                {expanded ? (
                  <ExpandLess style={{ fontSize: "18px" }} />
                ) : (
                  <ExpandMore style={{ fontSize: "18px" }} />
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            style={{ background: "#f5f5f5", border: "1px solid #DDDDDD" }}
          >
            <ListSubheader component="div">
              Notlar
              <IconButton
                aria-label={editNoteMode ? "Save" : "Edit"}
                style={{
                  float: "right",
                  width: "36px",
                  height: "36px",
                  top: "6px"
                }}
                onClick={this.handleNoteEditButtonClick}
                id={`edit-save-note-button-${task.id}`}
              >
                {editNoteMode ? (
                  <SaveIcon style={{ fontSize: "18px" }} />
                ) : (
                  <EditIcon style={{ fontSize: "18px" }} />
                )}
              </IconButton>
            </ListSubheader>
            {editNoteMode ? (
              <TextField
                autoFocus
                multiline
                // rowsMax={note ? note.split("<br />").length + 5 : "4"}
                name="note"
                value={note.replace(/<br\s*[\/]?>/gi, "\n")}
                margin="none"
                inputProps={{
                  rows: note ? note.split("<br />").length + 2 : "4",
                  style: {
                    paddingLeft: "14px",
                    paddingRight: "14px",
                    lineHeight: "1.46429em",
                    boxSizing: "border-box",
                    fontSize: "0.9rem",
                    backgroundColor: "rgba(255,255,255,0.8)"
                  }
                }}
                style={{ width: "100%" }}
                onChange={this.handleChange}
                onBlur={this.handleNoteEditInputBlur}
              />
            ) : (
              <Typography component="p" style={{ padding: "0.5em 1em" }}>
                {
                  note.split("<br />").map(strPart => (<React.Fragment>{strPart}<br /></React.Fragment>))
                }
              </Typography>
            )}
  
            {
              <List
                component="div"
                subheader={
                  <ListSubheader component="div" style={{ lineHeight: "36px" }}>
                    Alt Maddeler
                    <AddSubtask addSubtask={this.addSubtask}/>
                  </ListSubheader>
                }
                disablePadding
              >
                {
                  subtasks.map(subtask => <Subtask subtask={subtask} updateSubtask={this.updateSubtask} deleteSubtask={this.deleteSubtask} key={subtask.id}/>)
                }
              </List>
            }
          </Collapse>
        </React.Fragment>
      );
    }
}

export default Task;
import { List, ListSubheader } from "@material-ui/core";
import moment from "moment";
import "moment/locale/tr";
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from "./Task";
moment.locale("tr");

export default class TaskList extends React.Component {

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            this.props.reorder(
                source.droppableId,
                source.index,
                destination.index
            );
        } else {
            this.props.move(
                source.droppableId,
                destination.droppableId,
                source,
                destination
            );
        }
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
              {
                  Object.keys(this.props.tasks).map(month =>
                    <Droppable droppableId={month}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={{minHeight: "6em", padding: "2em 0"}}>
                          <List
                            subheader={
                              <ListSubheader component="div" style={{ background: "#FFFFFF" }}>
                                {moment(month).format("YYYY MMMM")}
                              </ListSubheader>
                            }
                          >
                            {this.props.tasks[month].map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                          <Task 
                                            task={task}
                                            month={month}
                                            toggleCompleted={() => this.props.toggleCompleted(month, task)}
                                            deleteTask={()=> this.props.deleteTask(month, task)}
                                            updateTask={task => this.props.updateTask(month, task)}
                                            key={`item-${index}`}

                                          />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                          </List>
                        </div>
                    )}
                </Droppable>
                )
              }
            </DragDropContext>
        );
    }
}
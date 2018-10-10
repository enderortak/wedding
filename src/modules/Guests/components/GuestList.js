import { List, ListSubheader } from "@material-ui/core";
import React from 'react';
import { red } from "@material-ui/core/colors";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Guest from "./Guest";

export default class GuestList extends React.Component {

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
            <div style={{display: "flex", flexDirection: "row", flexFlow: "wrap", justifyContent: "space-between"}}>
              {
                  this.props.guests.map((tableGuests, tableIndex) =>
                    <div style={{minHeight: "6em", padding: "2em 0", minWidth: "360px", width: "30%", display: "flex", flexDirection: "column"}}>
                        <ListSubheader component="div" style={{background: "#FFFFFF"}}>
                            {(window.secureMode ? "SubList" : "Masa ") + (tableIndex + 1)}
                        </ListSubheader>
                        <Droppable droppableId={"table_" + tableIndex}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={{flex: "1", display: "flex"}}>
                            <List
                                style={{flex: "1", padding: 0, background: snapshot.isDraggingOver ? red[50] : "white"}}
                            >
                                {tableGuests.map((guest, index) => (
                                    <Guest 
                                    index={index}
                                    guest={guest}
                                    tableIndex={tableIndex}
                                    deleteGuest={()=> this.props.deleteGuest(tableIndex, guest)}
                                    updateGuest={this.props.updateGuest}
                                    dKey={`guest-${guest.id}`}
                                    />
                                ))}
                                {provided.placeholder}
                            </List>
                            </div>
                        )}
                    </Droppable>
                </div>
                )
              }
              </div>
            </DragDropContext>
        );
    }
}
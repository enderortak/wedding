import React from "react";
import { Draggable } from 'react-beautiful-dnd';

const draggable = Component => props => {
    const {dKey, index, ...rest} = props;
    return (
        <Draggable
            key={dKey}
            draggableId={dKey}
            index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Component {...rest} />
                </div>
            )}
        </Draggable>
    );
}

export {draggable};
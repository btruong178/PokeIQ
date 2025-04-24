import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import '../../../css/damage_relations_quiz/react-dnd/draggable_types.css';

const DraggableType = ({ type }) => {
    const [collectObject, drag, preview] = useDrag({
        type: 'TYPE',
        item: { type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Set the drag preview to an empty image so that the default ghost is hidden.
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div
            ref={drag}
            className={`draggable-type ${collectObject.isDragging ? 'dragging' : ''}`}
            onClick={() => console.log(`Clicked on ${type}`)}
            onDragStart={() => console.log(`Dragging ${type}`)}
        >
            {type}
        </div>
    );
}

export default DraggableType;
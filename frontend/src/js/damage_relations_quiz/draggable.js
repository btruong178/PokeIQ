import React from 'react';
import { useDrag } from 'react-dnd';
import '../../css/damage_relations_quiz/draggable.css';

const Draggable = ({ type }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TYPE',
        item: { type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    if (isDragging) {
        return null;
    }

    return (
        <div
            ref={drag}
            className={`draggable-type ${isDragging ? 'dragging' : ''}`}
            onClick={() => console.log(`Clicked on ${type}`)}
            onDragStart={() => console.log(`Dragging ${type}`)}
        >
            {type}
        </div>
    );
}

export default Draggable;
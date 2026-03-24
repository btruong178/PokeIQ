import React from 'react';
import { useDragLayer } from 'react-dnd';
import '../../../css/Damage-Relations-Quiz/React-dnd/Custom-Drag-Layer.css';
import { styleLookup } from './Draggable-Types.js';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
};

function getItemStyles(offset) {
    if (!offset) return { display: 'none' };
    const { x, y } = offset;
    const transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

const CustomDragLayer = () => {
    const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getClientOffset(),
    }));

    if (!isDragging) return null;

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(currentOffset)}>
                <div className={["drag-preview", styleLookup[item.type]].join(' ')}>
                    {item.type}
                </div>
            </div>
        </div>
    );
};

export default CustomDragLayer;
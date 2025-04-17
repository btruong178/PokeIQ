import React from 'react';
import { useDragLayer } from 'react-dnd';
import '../../../css/damage_relations_quiz/CustomDragLayer.css';

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
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getClientOffset(),
    }));

    if (!isDragging) return null;

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(currentOffset)}>
                <div className="drag-preview">
                    {item.type}
                </div>
            </div>
        </div>
    );
};

export default CustomDragLayer;
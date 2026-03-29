/**
 * @file
 * CustomDragLayer component for the Damage Relations Quiz. <br>
 * Which provides a custom drag preview for the draggable Pokémon type buttons.
 */
import React from 'react';
import { useDragLayer } from 'react-dnd';
import 'css/Damage-Relations-Quiz/React-dnd/DND/Custom-Drag-Layer.css';
import { styleLookup } from 'js/Damage-Relations-Quiz/React-dnd/DND/Type-Utilities.js';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
};
// Function to calculate the position of the drag preview based on the current mouse offset
function getPreviewPositionStyle(offset) {
    if (!offset) return { display: 'none' };
    const { x, y } = offset;
    const transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}
/**
 * @memberof module:DamageRelations-ReactDND
 * @description
 * CustomDragLayer is a React component that creates a custom drag layer. <br>
 * Only renders when an item is being dragged.
 * @returns {JSX.Element} CustomDragLayer component
 */
const CustomDragLayer = () => {
    // Use the useDragLayer hook to access the current drag state and item information from monitor
    const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getClientOffset(),
    }));

    if (!isDragging) return null;

    return (
        <div style={layerStyles}>
            <div style={getPreviewPositionStyle(currentOffset)}>
                <div className={["drag-preview", styleLookup[item.type]].join(' ')}>
                    {item.type}
                </div>
            </div>
        </div>
    );
};

export default CustomDragLayer;
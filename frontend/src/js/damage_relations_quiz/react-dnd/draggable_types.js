import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import '../../../css/damage_relations_quiz/react-dnd/draggable_types.css';
import { Button } from 'react-bootstrap';

const DraggableType = ({ type, multiplier, dispatchAnswerObject }) => {
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

    const sendBacktoUnSelectedOnClick = () => {
        console.log("Clicked on type:", type);
        if (multiplier === "N/A") {
            console.log("Type is already in unSelected");
            return;
        }
        dispatchAnswerObject({
            command: 'REMOVE_TYPE',
            payload: { type }
        });
        dispatchAnswerObject({
            command: 'ADD_TYPE',
            payload: { type, effectiveness: "unSelected", multiplier: "N/A" }
        });
    }

    return (
        <div
            ref={drag}
            className={`draggable-type ${multiplier === "N/A" ? 'unselected' : ''} ${collectObject.isDragging ? 'dragging' : ''}`}
            onClick={() => sendBacktoUnSelectedOnClick()}
        >
            {type}
            {multiplier !== "N/A" && (
                <Button
                    className="multiplier-button"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("Clicked on multiplier:", multiplier);
                        dispatchAnswerObject({
                            command: 'SWITCH_MULTIPLIER',
                            payload: { type, multiplier }
                        });
                    }}
                >
                    {multiplier}
                </Button>
            )}
        </div>
    );
}

export default DraggableType;
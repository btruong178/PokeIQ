import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import '../../../css/damage_relations_quiz/react-dnd/draggable_types.css';

const DraggableType = ({ type, AnswerMap, setAnswerMap }) => {
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
        const newAnswerMap = { ...AnswerMap };
        if (newAnswerMap["unSelected"]["N/A"].includes(type)) {
            console.log("Type already in unSelected, not sending back.");
            return;
        }

        for (const [effectiveness, object] of Object.entries(newAnswerMap)) {
            for (const [multiplier, array] of Object.entries(object)) {
                if (array.includes(type)) {
                    newAnswerMap[effectiveness][multiplier] = array.filter(t => t !== type);
                }
            }
        }
        newAnswerMap["unSelected"]["N/A"].push(type);
        setAnswerMap(newAnswerMap);
    }

    return (
        <div
            ref={drag}
            className={`draggable-type ${collectObject.isDragging ? 'dragging' : ''}`}
            onClick={() => sendBacktoUnSelectedOnClick()}
        >
            {type}
        </div>
    );
}

export default DraggableType;
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

    const sendBacktoUnSelected = (event) => {
        if (AnswerMap["unSelected"]?.includes(type)) {
            return;
        } else {
            setAnswerMap(prev => {
                const newMap = { ...prev };
                for (const key in newMap) {
                    if (newMap[key].includes(type)) {
                        newMap[key] = newMap[key].filter(t => t !== type);
                    }
                }
                newMap["unSelected"] = [...newMap["unSelected"], type];
                return newMap;
            });
        }

    }

    return (
        <div
            ref={drag}
            className={`draggable-type ${collectObject.isDragging ? 'dragging' : ''}`}
            onClick={() => sendBacktoUnSelected()}
        >
            {type}
        </div>
    );
}

export default DraggableType;
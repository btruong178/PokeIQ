import '../../css/damage_relations_quiz/interface.css';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { availableTypes } from './logic.js';
import DraggableType from './react-dnd/draggable_types.js';



const TypeButtons = ({ AnswerMap, setAnswerMap }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'TYPE',
        drop: (item) => {
            if (AnswerMap["unSelected"].includes(item.type)) {
                console.log(`Already dropped ${item.type} in unSelected`);
                return;
            }
            setAnswerMap((prev) => {
                let newAnswerMap = { ...prev };
                newAnswerMap["unSelected"].push(item.type);
                console.log(newAnswerMap);
                return newAnswerMap;
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }), [setAnswerMap]);



    return (
        <div ref={drop} className={`button-container ${isOver ? 'hover' : ''} ${canDrop ? 'can-drop' : ''}`}>
            <div className="button-display">
                {AnswerMap["unSelected"].map((type, index) => (
                    <DraggableType key={index} type={type} />
                ))}
            </div>
        </div>
    );
}

export default TypeButtons;
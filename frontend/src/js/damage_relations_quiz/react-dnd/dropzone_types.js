import { useDrop } from 'react-dnd';
import DraggableType from './draggable_types';
import '../../../css/damage_relations_quiz/react-dnd/dropzone_types.css';

const DropZone = ({ type_effectiveness, type_multiplier, AnswerMap, setAnswerMap }) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'TYPE',
        drop: (item) => {
            if (AnswerMap[type_multiplier].includes(item.type)) {
                console.log(`Already dropped ${item.type} in ${type_multiplier}`);
                return;
            }
            setAnswerMap((prev) => {
                let newAnswerMap = { ...prev };
                newAnswerMap[type_multiplier].push(item.type);
                console.log(newAnswerMap);
                return newAnswerMap;
            });

        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }), [AnswerMap]);

    return (
        <div
            ref={drop}
            className={`dropzone${isOver ? ' hover' : ''}${canDrop ? ' can-drop' : ''}`}
        >
            {type_multiplier !== "unSelected" && <h5>{type_effectiveness} ({type_multiplier})</h5>}
            <div className="dropzone-content">
                {AnswerMap[type_multiplier].length > 0
                    ? AnswerMap[type_multiplier].map((type, i) => (
                        <DraggableType key={i} className="dropped-type" type={type}>{type}</DraggableType>
                    ))
                    : <p>Drop types here</p>
                }
            </div>
        </div>
    );
}

export default DropZone;
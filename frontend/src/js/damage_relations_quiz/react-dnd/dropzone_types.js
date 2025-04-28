import { useDrop } from 'react-dnd';
import DraggableType from './draggable_types';
import '../../../css/damage_relations_quiz/react-dnd/dropzone_types.css';

const DropZone = ({ type_effectiveness, type_multiplier, AnswerMap, setAnswerMap }) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'TYPE',
        drop: ({ type }) => {
            setAnswerMap(prev => {
                const newMap = Object.fromEntries(
                    Object.entries(prev).map(
                        ([key, arr]) => [key, arr.filter(t => t !== type)]
                    )
                );
                newMap[type_multiplier] = [...newMap[type_multiplier], type];
                return newMap;
            });
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }), [setAnswerMap]);

    return (
        <>
            {type_multiplier === "unSelected" ? (
                <div
                    ref={drop}
                    className={'unSelected-button-container'}
                >
                    <div className={`unSelected-buttons`}>
                        {AnswerMap[type_multiplier].map((type, i) => (
                            <DraggableType
                                key={i}
                                type={type}
                                AnswerMap={AnswerMap}
                                setAnswerMap={setAnswerMap}>
                                {type}
                            </DraggableType>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    ref={drop}
                    className={'dropzone'}
                >
                    <h5>{type_effectiveness} ({type_multiplier})</h5>
                    <div className={`dropzone-content ${isOver ? 'hover' : ''} ${canDrop ? 'can-drop' : ''}`}>
                        {AnswerMap[type_multiplier].map((type, i) => (
                            <DraggableType
                                key={i}
                                type={type}
                                AnswerMap={AnswerMap}
                                setAnswerMap={setAnswerMap}>
                                {type}
                            </DraggableType>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
}

export default DropZone;